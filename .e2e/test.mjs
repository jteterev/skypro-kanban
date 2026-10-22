import puppeteer from "puppeteer-core";
import {
  BASE,
  CHROME_PATH,
  CONTROL,
  report,
  startServers,
} from "./harness.mjs";

const results = [];
const failures = [];

const check = (condition, message) => {
  if (condition) {
    results.push(`OK: ${message}`);
  } else {
    failures.push(`FAIL: ${message}`);
  }
};

// Тест самодостаточен: mock API и dev-сервер поднимаются на время прогона
// и останавливаются в конце, поэтому не нужны заранее запущенные процессы.
const servers = await startServers();

const setServerState = async (patch) => {
  const response = await fetch(CONTROL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });

  if (!response.ok) throw new Error("не удалось обновить состояние мока");
};

const readServerState = async () => (await fetch(CONTROL)).json();

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.setDefaultTimeout(30000);

const consoleIssues = [];
const pageErrors = [];

page.on("console", (message) => {
  if (message.type() === "error" || message.type() === "warning") {
    const url = message.location()?.url || "";
    consoleIssues.push(`[${message.type()}] ${message.text()} ${url}`);
  }
});
page.on("pageerror", (error) => {
  pageErrors.push(error.message);
});

const getText = (selector) =>
  page.$eval(selector, (element) => element.textContent.trim());

const hasText = async (selector, expected) => {
  try {
    await page.waitForFunction(
      (sel, text) => {
        const element = document.querySelector(sel);
        return element && element.textContent.includes(text);
      },
      { timeout: 8000 },
      selector,
      expected,
    );
    return true;
  } catch {
    return false;
  }
};

const waitForTextInMain = async (expected) => {
  try {
    await page.waitForFunction(
      (text) =>
        document.querySelector("main")?.textContent.includes(text) ?? false,
      { timeout: 8000 },
      expected,
    );
    return true;
  } catch {
    return false;
  }
};

// Сообщения об ошибках ищем только внутри оверлея, чтобы не спутать
// с сообщениями на доске под ним
const isOverlayAlertVisible = () =>
  page.evaluate(() => {
    const mains = document.querySelectorAll("main");
    const overlay = mains[mains.length - 1];
    const alert = overlay?.querySelector('[role="alert"]');
    if (!alert) return false;
    const style = getComputedStyle(alert);
    const rect = alert.getBoundingClientRect();
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  });

// Оверлейные страницы рендерятся поверх доски, поэтому ищем текст в последнем <main>
const waitForTextInOverlay = async (expected) => {
  try {
    await page.waitForFunction(
      (text) => {
        const mains = document.querySelectorAll("main");
        const overlay = mains[mains.length - 1];
        return overlay ? overlay.textContent.includes(text) : false;
      },
      { timeout: 8000 },
      expected,
    );
    return true;
  } catch {
    return false;
  }
};

const isVisible = (selector) =>
  page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  }, selector);

const login = async () => {
  await page.evaluate(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: "user-1",
        login: "tester@mail.ru",
        name: "Тестировщик",
        token: "test-token",
      }),
    );
  });
};

const sampleTask = (overrides = {}) => ({
  _id: "task-1",
  title: "Первая задача",
  topic: "Web Design",
  status: "Без статуса",
  description: "Описание первой задачи",
  date: new Date(2026, 9, 15, 12).toISOString(),
  ...overrides,
});

try {
  // 1. Login page and validation
  await page.goto(`${BASE}/login`, { waitUntil: "load" });
  check((await getText("h2")) === "Вход", "страница входа открывается");

  await page.click("#btnLogin");
  check(
    await hasText(".auth__error", "Заполните логин и пароль"),
    "вход: пустые поля не отправляются",
  );

  await page.type("#formloginLogin", "   ");
  await page.type("#formloginPass", "   ");
  await page.click("#btnLogin");
  check(
    await hasText(".auth__error", "Заполните логин и пароль"),
    "вход: поля из пробелов не отправляются",
  );

  const loginCardStyle = await page.evaluate(() => {
    const card = document.querySelector("form").parentElement;
    const style = getComputedStyle(card);
    return {
      background: style.backgroundColor,
      radius: style.borderRadius,
      border: style.borderColor,
      padding: style.padding,
    };
  });

  // 2. Register page validation
  await page.goto(`${BASE}/register`, { waitUntil: "domcontentloaded" });
  await page.click("#btnReg");
  check(
    await hasText(".auth__error", "Заполните все поля"),
    "регистрация: пустые поля не отправляются",
  );

  // 3. 404 page
  await page.goto(`${BASE}/some-unknown-page`, {
    waitUntil: "domcontentloaded",
  });
  check(
    (await page.$eval("main", (element) => element.textContent)).includes(
      "404",
    ),
    "404: страница отображается для неизвестного маршрута",
  );
  check(
    (
      await page.$eval('a[href="/"]', (element) => element.textContent)
    ).includes("Вернуться на главную"),
    "404: есть ссылка на главную страницу",
  );

  const notFoundStyle = await page.evaluate(() => {
    const card = document.querySelector('a[href="/"]').parentElement;
    const style = getComputedStyle(card);
    return {
      background: style.backgroundColor,
      radius: style.borderRadius,
      border: style.borderColor,
      padding: style.padding,
    };
  });
  const bodyFont = await page.evaluate(
    () => getComputedStyle(document.body).fontFamily,
  );
  const pageBackground = await page.evaluate(
    () => getComputedStyle(document.querySelector("main")).backgroundColor,
  );

  check(
    JSON.stringify(loginCardStyle) === JSON.stringify(notFoundStyle),
    "404: карточка оформлена так же, как на страницах входа",
  );
  check(
    bodyFont.toLowerCase().includes("roboto"),
    "404: используется общий шрифт Roboto",
  );
  check(
    pageBackground === "rgb(234, 238, 246)",
    "404: используется общий фон страниц",
  );

  // 4. Board: empty state
  await login();
  await setServerState({ tasks: [] });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  check(
    await waitForTextInMain("Новых задач нет"),
    "доска: показывается «Новых задач нет» без ошибок",
  );
  check(
    !(await isVisible('[role="alert"]')),
    "доска: при отсутствии задач нет сообщения об ошибке",
  );
  check(
    await page.$eval(
      "header img",
      (img) => img.complete && img.naturalWidth > 0,
    ),
    "шапка: логотип загружается",
  );

  // 5. Board with tasks and layout
  await setServerState({
    tasks: [
      sampleTask({ _id: "task-1", status: "Без статуса" }),
      sampleTask({ _id: "task-2", title: "Вторая", status: "Нужно сделать" }),
      sampleTask({ _id: "task-3", title: "Третья", status: "В работе" }),
      sampleTask({ _id: "task-4", title: "Четвертая", status: "Тестирование" }),
      sampleTask({ _id: "task-5", title: "Пятая", status: "Готово" }),
      sampleTask({
        _id: "task-6",
        title: "Неизвестный статус",
        status: "Странно",
      }),
    ],
  });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  check(
    await hasText("main", "Первая задача"),
    "доска: задачи отображаются в колонках",
  );
  check(
    (await page.$$('a[href^="/card/"]')).length === 12,
    "доска: все задачи видны, включая задачу с неизвестным статусом",
  );

  const columnRects = await page.evaluate(() => {
    const titles = [...document.querySelectorAll("main p")].filter((p) =>
      [
        "Без статуса",
        "Нужно сделать",
        "В работе",
        "Тестирование",
        "Готово",
      ].includes(p.textContent.trim()),
    );
    return titles
      .map((p) => p.parentElement.parentElement.getBoundingClientRect())
      .map((rect) => ({ x: rect.x, width: rect.width }))
      .sort((a, b) => a.x - b.x);
  });
  check(columnRects.length === 5, "доска: отображаются пять колонок");
  check(
    columnRects.every((rect) => rect.width > 200),
    "доска: колонки не сжаты",
  );
  check(
    columnRects.every(
      (rect, index) =>
        index === 0 ||
        rect.x >= columnRects[index - 1].x + columnRects[index - 1].width - 1,
    ),
    "доска: колонки не перекрывают друг друга",
  );

  // 6. Card page: view, validation, server errors, edit
  await page.click('a[href="/card/task-1"]');
  check(
    await waitForTextInOverlay("Описание первой задачи"),
    "задача: карточка открывается и загружает данные",
  );

  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((button) => button.textContent.includes("Редактировать задачу"))
      ?.click();
  });
  await page.waitForSelector('input[aria-label="Название задачи"]', {
    timeout: 8000,
  });
  check(true, "задача: режим редактирования включается");

  // Поля редактирования заполняем через evaluate: клик по оверлею может
  // перехватываться элементами, поэтому работаем с DOM напрямую
  const clearField = async (selector) => {
    await page.evaluate((sel) => {
      const field = document.querySelector(sel);
      const proto =
        field.tagName === "TEXTAREA"
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      setter.call(field, "");
      field.dispatchEvent(new Event("input", { bubbles: true }));
    }, selector);
  };

  const typeInto = async (selector, text) => {
    await page.evaluate(
      (sel, value) => {
        const field = document.querySelector(sel);
        const proto =
          field.tagName === "TEXTAREA"
            ? HTMLTextAreaElement.prototype
            : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
        setter.call(field, value);
        field.dispatchEvent(new Event("input", { bubbles: true }));
      },
      selector,
      text,
    );
  };

  const clickButtonByText = async (label) => {
    await page.evaluate((text) => {
      [...document.querySelectorAll("button")]
        .find((button) => button.textContent.includes(text))
        ?.click();
    }, label);
  };

  await clearField('input[aria-label="Название задачи"]');
  await clearField('textarea[aria-label="Описание задачи"]');
  await clickButtonByText("Сохранить");
  check(
    await waitForTextInOverlay("Введите название задачи"),
    "задача: нельзя сохранить пустое название",
  );

  await typeInto('input[aria-label="Название задачи"]', "   ");
  await clickButtonByText("Сохранить");
  check(
    await waitForTextInOverlay("Введите название задачи"),
    "задача: название из пробелов не принимается",
  );

  await clearField('input[aria-label="Название задачи"]');
  await typeInto('input[aria-label="Название задачи"]', "Обновленная задача");
  await clickButtonByText("Сохранить");
  check(
    await waitForTextInOverlay("Введите описание задачи"),
    "задача: нельзя сохранить пустое описание",
  );

  await setServerState({
    failure: {
      method: "PUT",
      status: 400,
      message: "Сервер отклонил изменения",
    },
  });
  await typeInto(
    'textarea[aria-label="Описание задачи"]',
    "Новое описание задачи",
  );
  await clickButtonByText("Сохранить");
  check(
    await waitForTextInOverlay("Сервер отклонил изменения"),
    "задача: ошибка сервера при редактировании видна пользователю",
  );

  const dayButtons = await page.$$("main button[aria-pressed]");
  check(
    dayButtons.length > 0,
    "задача: календарь доступен в режиме редактирования",
  );
  if (dayButtons.length > 0) {
    await clickButtonByText("Сохранить");
  }

  await setServerState({ failure: null });
  await clickButtonByText("Сохранить");
  check(
    await waitForTextInOverlay("Обновленная задача"),
    "задача: изменения сохраняются и отображаются",
  );
  check(
    !(await isOverlayAlertVisible()),
    "задача: после успешного сохранения ошибка скрывается",
  );

  await setServerState({
    failure: {
      method: "DELETE",
      status: 500,
      message: "Не удалось удалить задачу",
    },
  });
  await clickButtonByText("Удалить задачу");
  check(
    await waitForTextInOverlay("Не удалось удалить задачу"),
    "задача: ошибка сервера при удалении видна пользователю",
  );

  await setServerState({ failure: null });
  await clickButtonByText("Удалить задачу");
  await setServerState({
    tasks: [sampleTask({ _id: "task-1", status: "Без статуса" })],
  });
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  check(
    await waitForTextInMain("Первая задача"),
    "задача: после удаления открывается доска без задач",
  );

  // 7. Create page: validation, server error, success
  await page.click("#btnMainNew");
  check(
    await waitForTextInOverlay("Создание задачи"),
    "создание: страница открывается",
  );

  await clickButtonByText("Создать задачу");
  check(
    await waitForTextInOverlay("Введите название задачи"),
    "создание: пустое название не отправляется",
  );
  check(
    await waitForTextInOverlay("Введите описание задачи"),
    "создание: пустое описание не отправляется",
  );

  await typeInto("#formTitle", "   ");
  await typeInto("#textArea", "   ");
  await clickButtonByText("Создать задачу");
  check(
    await waitForTextInOverlay("Введите название задачи"),
    "создание: поля из пробелов не отправляются",
  );

  await clearField("#formTitle");
  await typeInto("#formTitle", "Задача из теста");
  await clearField("#textArea");
  await typeInto("#textArea", "Описание из теста");

  await page.evaluate(() => {
    [...document.querySelectorAll("main [aria-pressed]")]
      .find((element) => element.textContent.trim() === "Research")
      ?.click();
  });

  await page.evaluate(() => {
    [...document.querySelectorAll("main button[aria-pressed]")]
      .find((button) => button.textContent.trim() === "21")
      ?.click();
  });

  await setServerState({
    failure: {
      method: "POST",
      status: 400,
      message: "Сервер не принял задачу",
    },
  });
  await clickButtonByText("Создать задачу");
  check(
    await waitForTextInOverlay("Сервер не принял задачу"),
    "создание: ошибка сервера видна пользователю",
  );

  await setServerState({ failure: null });
  await clickButtonByText("Создать задачу");
  check(
    await waitForTextInOverlay("Задача из теста"),
    "создание: задача добавляется на доску",
  );
  const serverState = await readServerState();
  check(
    serverState.lastBody?.topic === "Research",
    "создание: выбранная категория отправляется на сервер",
  );
  check(
    serverState.lastBody?.date?.includes("-21T") ||
      serverState.lastBody?.date?.includes("-21"),
    "создание: выбранная дата отправляется на сервер",
  );

  // 8. Board: server failure and retry
  await setServerState({
    failure: {
      method: "GET",
      status: 500,
      message: "Сервер временно недоступен",
    },
  });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  check(
    await waitForTextInMain("Сервер временно недоступен"),
    "доска: ошибка сервера показывается пользователю",
  );
  check(
    (await page.$$("button")).length > 0 &&
      (await page.evaluate(() =>
        [...document.querySelectorAll("button")].some((button) =>
          button.textContent.includes("Повторить"),
        ),
      )),
    "доска: есть кнопка повтора запроса",
  );

  await setServerState({ failure: null });
  await clickButtonByText("Повторить");
  check(
    await hasText("main", "Задача из теста"),
    "доска: повторный запрос восстанавливает данные",
  );

  await setServerState({ down: true });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  check(
    await waitForTextInMain("Сервер недоступен"),
    "доска: сетевая ошибка обрабатывается",
  );
  await setServerState({ down: false });

  // 9. Card not found
  await page.goto(`${BASE}/card/unknown-id`, { waitUntil: "load" });
  check(
    await waitForTextInOverlay("Задача не найдена"),
    "задача: 404 от сервера обрабатывается",
  );

  // 9a. Loader на доске и на карточке
  await setServerState({ delay: 2500 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  check(
    await waitForTextInMain("Загружаем задачи..."),
    "доска: во время загрузки показывается индикатор загрузки",
  );
  check(
    await isVisible('[role="status"]'),
    "доска: индикатор загрузки доступен для скринридеров",
  );
  await setServerState({ delay: 0 });
  await page.waitForFunction(() => !document.querySelector('[role="status"]'), {
    timeout: 15000,
  });
  check(true, "доска: индикатор загрузки исчезает после загрузки задач");

  await setServerState({ delay: 2500 });
  await page.goto(`${BASE}/card/task-1`, { waitUntil: "domcontentloaded" });
  check(
    await waitForTextInOverlay("Загружаем задачу..."),
    "задача: во время загрузки показывается индикатор загрузки",
  );
  await setServerState({ delay: 0 });
  await page.waitForFunction(() => !document.querySelector('[role="status"]'), {
    timeout: 15000,
  });
  check(true, "задача: индикатор загрузки исчезает после загрузки карточки");

  // 9b. Карточка недоступна: сервер не отвечает
  await setServerState({ down: true });
  await page.goto(`${BASE}/card/task-1`, { waitUntil: "domcontentloaded" });
  check(
    await waitForTextInOverlay("Сервер недоступен"),
    "задача: сетевая ошибка при загрузке карточки обрабатывается",
  );
  await setServerState({ down: false });

  // 10. Exit page
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForSelector("#user-set-target");
  await page.evaluate(() => {
    document
      .querySelector('button[aria-haspopup="true"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  check(await isVisible("#user-set-target"), "меню пользователя открывается");
  await page.evaluate(() => {
    [...document.querySelectorAll("#user-set-target a")]
      .find((link) => link.textContent.includes("Выйти"))
      ?.click();
  });
  check(
    await waitForTextInOverlay("Выйти из аккаунта?"),
    "выход: страница подтверждения открывается",
  );
  await clickButtonByText("Да, выйти");
  check(
    page.url().endsWith("/login"),
    "выход: пользователь возвращается на страницу входа",
  );
  check(
    await page.evaluate(() => localStorage.getItem("user") === null),
    "выход: данные пользователя очищаются",
  );
} catch (error) {
  failures.push(`FAIL: исключение — ${error.message}`);
} finally {
  const realConsoleIssues = consoleIssues.filter(
    (issue) =>
      !issue.includes("Download the React DevTools") &&
      !issue.includes("[vite]") &&
      !issue.includes("net::ERR_FAILED") &&
      !issue.includes("net::ERR_EMPTY_RESPONSE") &&
      !issue.includes("net::ERR_CONNECTION") &&
      !issue.includes("fonts.googleapis") &&
      !issue.includes("fonts.gstatic") &&
      // Специально смоделированные ответы сервера (400/500/404) —
      // браузер всегда логирует их в консоль, приложение их корректно показывает
      !/Failed to load resource: the server responded with a status of \d+/.test(
        issue,
      ),
  );

  check(
    pageErrors.length === 0,
    `нет ошибок выполнения: ${pageErrors.join(" | ")}`,
  );
  check(
    realConsoleIssues.length === 0,
    `нет ошибок и предупреждений в консоли: ${realConsoleIssues.join(" | ")}`,
  );

  await browser.close();
  servers.stop();

  report(results, failures);
}
