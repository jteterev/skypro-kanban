// Ручная дымовая проверка: сценарий обычного пользователя.
// Логин через форму -> доска -> открытие карточки -> создание задачи -> выход.
import puppeteer from "puppeteer-core";
import {
  BASE,
  CHROME_PATH,
  CONTROL,
  report,
  resetServer,
  startServers,
} from "./harness.mjs";

const results = [];
const failures = [];

const demoTasks = [
  {
    _id: "task-demo-1",
    title: "Собрать макет доски",
    topic: "Web Design",
    status: "Нужно сделать",
    description:
      "Подготовить макет главной страницы доски: шапка, пять колонок, карточки задач.",
    date: "2026-10-12T12:00:00.000Z",
  },
  {
    _id: "task-demo-2",
    title: "Исследовать конкурентов",
    topic: "Research",
    status: "В работе",
    description:
      "Собрать примеры kanban-сервисов и выписать общее и различное в их интерфейсах.",
    date: "2026-10-14T12:00:00.000Z",
  },
  {
    _id: "task-demo-3",
    title: "Настроить API-клиент",
    topic: "Development",
    status: "Тестирование",
    description:
      "Проверить обработку ошибок и таймаутов в клиенте, добавить повтор запроса.",
    date: "2026-10-16T12:00:00.000Z",
  },
  {
    _id: "task-demo-4",
    title: "Проверить вёрстку на мобильных",
    topic: "Testing",
    status: "Готово",
    description:
      "Прогнать страницы на ширинах 360, 480 и 768 пикселей, убедиться в отсутствии горизонтального скролла.",
    date: "2026-10-18T12:00:00.000Z",
  },
];

const check = (condition, message) => {
  if (condition) {
    results.push(`OK: ${message}`);
  } else {
    failures.push(`FAIL: ${message}`);
  }
};

// Тест самодостаточен: mock API и dev-сервер поднимаются на время прогона.
const servers = await startServers();

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
    consoleIssues.push(`[${message.type()}] ${message.text()}`);
  }
});
page.on("pageerror", (error) => pageErrors.push(error.message));

// Оверлейные страницы (карточка, создание, выход) рендерятся поверх доски
// отдельным <main>, поэтому ищем текст в последнем <main>.
const waitForText = async (selector, expected, timeout = 10000) => {
  try {
    await page.waitForFunction(
      (sel, text) => {
        const element =
          sel === "overlay"
            ? (() => {
                const mains = document.querySelectorAll("main");
                return mains[mains.length - 1];
              })()
            : document.querySelector(sel);
        return element?.textContent.includes(text) ?? false;
      },
      { timeout },
      selector,
      expected,
    );
    return true;
  } catch {
    return false;
  }
};

const clickButtonByText = async (label) => {
  await page.evaluate((text) => {
    [...document.querySelectorAll("button")]
      .find((button) => button.textContent.includes(text))
      ?.click();
  }, label);
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

try {
  // Сбрасываем состояние mock-сервера, чтобы доска на прогоне была одинаковой
  await resetServer({ tasks: demoTasks, failure: null, down: false });

  // 1. Страница входа
  await page.goto(`${BASE}/login`, { waitUntil: "load" });
  check(
    (await page.$eval("h2", (element) => element.textContent.trim())) ===
      "Вход",
    "страница входа открывается",
  );
  check(
    page.url().endsWith("/login"),
    "неавторизованный пользователь попадает на страницу входа",
  );

  // 2. Вход с неверным паролем
  await page.type("#formloginLogin", "demo@mail.ru");
  await page.type("#formloginPass", "wrong-password");
  await page.click("#btnLogin");
  check(
    await waitForText(".auth__error", "Неверный логин или пароль"),
    "вход: неверный пароль показывает ошибку",
  );

  // 3. Успешный вход
  await page.evaluate(() => {
    document.querySelector("#formloginPass").value = "";
  });
  await page.type("#formloginPass", "demo1234");
  await page.click("#btnLogin");
  check(
    await waitForText("main", "Собрать макет доски"),
    "вход: успешный вход открывает доску с задачами",
  );
  check(page.url().endsWith("/"), "вход: происходит переход на главную");
  check(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("user") || "{}").login ===
        "demo@mail.ru",
    ),
    "вход: данные пользователя сохраняются в localStorage",
  );

  // 4. Доска: колонки и карточки
  const columns = await page.$$eval("main p", (elements) =>
    elements
      .map((element) => element.textContent.trim())
      .filter((text) =>
        [
          "Без статуса",
          "Нужно сделать",
          "В работе",
          "Тестирование",
          "Готово",
        ].includes(text),
      ),
  );
  check(
    columns.length === 5,
    `доска: отображаются пять колонок (${columns.length})`,
  );
  const cardLinks = await page.$$eval('a[href^="/card/"]', (elements) =>
    elements.map((element) => element.getAttribute("href")),
  );
  const uniqueCards = new Set(cardLinks);
  check(
    uniqueCards.size === 4,
    `доска: отображаются все демо-задачи (${uniqueCards.size})`,
  );
  check(
    await page.$eval(
      "header img",
      (img) => img.complete && img.naturalWidth > 0,
    ),
    "шапка: логотип загружается",
  );

  // 5. Карточка задачи
  await page.click('a[href="/card/task-demo-1"]');
  check(
    await waitForText("overlay", "Подготовить макет главной страницы"),
    "карточка: открывается описание задачи",
  );
  check(
    await waitForText("overlay", "Собрать макет доски"),
    "карточка: отображается заголовок задачи",
  );

  // 6. Выход из аккаунта
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForSelector("#user-set-target");
  await page.evaluate(() => {
    document
      .querySelector('button[aria-haspopup="true"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await page.evaluate(() => {
    [...document.querySelectorAll("#user-set-target a")]
      .find((link) => link.textContent.includes("Выйти"))
      ?.click();
  });
  check(
    await waitForText("overlay", "Выйти из аккаунта?"),
    "выход: страница подтверждения открывается",
  );
  await clickButtonByText("Да, выйти");
  check(
    page.url().endsWith("/login"),
    "выход: пользователь возвращается на вход",
  );
  check(
    await page.evaluate(() => localStorage.getItem("user") === null),
    "выход: данные пользователя очищаются",
  );

  // 7. Создание задачи
  await page.goto(`${BASE}/login`, { waitUntil: "load" });
  await page.type("#formloginLogin", "demo@mail.ru");
  await page.type("#formloginPass", "demo1234");
  await page.click("#btnLogin");
  await waitForText("main", "Собрать макет доски");
  await page.click("#btnMainNew");
  check(
    await waitForText("overlay", "Создание задачи"),
    "создание: страница создания открывается",
  );
  await typeInto("#formTitle", "Задача из дымовой проверки");
  await typeInto("#textArea", "Описание из дымовой проверки");
  await clickButtonByText("Создать задачу");
  check(
    await waitForText("main", "Задача из дымовой проверки"),
    "создание: задача появляется на доске",
  );

  // 8. 404
  await page.goto(`${BASE}/no-such-page`, { waitUntil: "load" });
  check(
    await waitForText("main", "404"),
    "404: страница отображается для неизвестного маршрута",
  );
} catch (error) {
  failures.push(`FAIL: исключение — ${error.message}`);
} finally {
  const realConsoleIssues = consoleIssues.filter(
    (issue) =>
      !issue.includes("Download the React DevTools") &&
      !issue.includes("[vite]") &&
      !issue.includes("net::ERR_FAILED") &&
      !issue.includes("net::ERR_CONNECTION") &&
      !issue.includes("fonts.googleapis") &&
      !issue.includes("fonts.gstatic") &&
      // 401 — намеренная проверка входа с неверным паролем
      !issue.includes("401 (Unauthorized)"),
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
