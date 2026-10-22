// Проверка закрытия формы создания задачи: только клик вне окна.
import puppeteer from "puppeteer-core";
import {
  BASE,
  CHROME_PATH,
  report,
  resetServer,
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
];

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

const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

const openNewCard = async () => {
  await page.goto(`${BASE}/new-card`, { waitUntil: "load" });
  await page.waitForSelector("#formTitle");
};

// Клик по затемнённому фону (вне блока формы)
const clickOverlay = async () => {
  await page.evaluate(() => {
    const mains = document.querySelectorAll("main");
    const overlay = mains[mains.length - 1];
    const rect = overlay.getBoundingClientRect();
    overlay.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        clientX: rect.left + 5,
        clientY: rect.top + 5,
      }),
    );
  });
};

const isOnBoard = () =>
  page.evaluate(() => {
    const mains = document.querySelectorAll("main");
    const last = mains[mains.length - 1];
    return {
      url: window.location.pathname,
      hasNewCard: Boolean(last?.querySelector("#formTitle")),
      boardVisible: Boolean(
        document.querySelector('a[href^="/card/"], .column, [class*="column"]'),
      ),
    };
  });

try {
  await resetServer({ tasks: demoTasks, failure: null, down: false });

  // Авторизуемся, чтобы страница создания была доступна
  await page.goto(`${BASE}/login`, { waitUntil: "load" });
  await page.type("#formloginLogin", "demo@mail.ru");
  await page.type("#formloginPass", "demo1234");
  await page.click("#btnLogin");
  await page.waitForFunction(
    () => document.body.innerText.includes("Собрать макет доски"),
    { timeout: 15000 },
  );

  // 1. Крестик и кнопка «Отмена» удалены
  await openNewCard();
  check(
    await page.evaluate(() => !document.querySelector("#btnNewCardClose")),
    "форма: крестик отсутствует",
  );
  check(
    await page.evaluate(() => !document.querySelector("#btnNewCardCancel")),
    "форма: кнопка «Отмена» отсутствует",
  );
  check(
    await page.evaluate(
      () =>
        ![...document.querySelectorAll("button")].some(
          (button) => button.textContent.trim() === "Отмена",
        ),
    ),
    "форма: текста «Отмена» в кнопках нет",
  );

  // 2. Escape не закрывает форму
  await page.keyboard.press("Escape");
  await new Promise((resolve) => setTimeout(resolve, 700));
  let state = await isOnBoard();
  check(state.hasNewCard, "escape: форма остаётся открытой");

  // 3. Клик по затемнённому фону закрывает форму
  await clickOverlay();
  await page.waitForFunction(() => window.location.pathname === "/", {
    timeout: 10000,
  });
  await page
    .waitForFunction(() => !document.querySelector("#formTitle"), {
      timeout: 10000,
    })
    .catch(() => {});
  state = await isOnBoard();
  check(state.url === "/", "фон: происходит возврат на доску (/)");
  check(!state.hasNewCard, "фон: форма создания закрыта");

  // 4. Клик по самой форме не закрывает её
  await openNewCard();
  await page.evaluate(() => {
    document
      .querySelector("#formTitle")
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await new Promise((resolve) => setTimeout(resolve, 700));
  state = await isOnBoard();
  check(state.hasNewCard, "форма: клик внутри формы не закрывает её");

  // 4b. Клик по пустому месту вокруг блока формы закрывает её
  await page.evaluate(() => {
    const mains = document.querySelectorAll("main");
    const overlay = mains[mains.length - 1];
    const container = overlay.querySelector("div");
    const rect = container.getBoundingClientRect();
    container.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        clientX: rect.left + 10,
        clientY: rect.top + 10,
      }),
    );
  });
  await page
    .waitForFunction(() => window.location.pathname === "/", { timeout: 10000 })
    .catch(() => {});
  state = await isOnBoard();
  check(!state.hasNewCard, "пустое место рядом с формой закрывает форму");

  // 6. Кнопка «Создать задачу» по-прежнему работает
  await openNewCard();
  await page.evaluate(() => {
    const setValue = (selector, value) => {
      const field = document.querySelector(selector);
      const proto =
        field.tagName === "TEXTAREA"
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      setter.call(field, value);
      field.dispatchEvent(new Event("input", { bubbles: true }));
    };

    setValue("#formTitle", "Задача после проверки закрытия");
    setValue("#textArea", "Описание после проверки закрытия");
  });
  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((button) => button.textContent.includes("Создать задачу"))
      ?.click();
  });
  await page.waitForFunction(
    () => document.body.innerText.includes("Задача после проверки закрытия"),
    { timeout: 15000 },
  );
  check(true, "создание: кнопка «Создать задачу» по-прежнему создаёт задачу");

  // 7. Во время отправки форма не закрывается
  await openNewCard();
  await page.setRequestInterception(true);
  const delayHandler = async (request) => {
    if (request.method() === "POST" && request.url().includes("/kanban")) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    request.continue();
  };
  page.on("request", delayHandler);

  await page.evaluate(() => {
    const setValue = (selector, value) => {
      const field = document.querySelector(selector);
      const proto =
        field.tagName === "TEXTAREA"
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      setter.call(field, value);
      field.dispatchEvent(new Event("input", { bubbles: true }));
    };

    setValue("#formTitle", "Задача с задержкой отправки");
    setValue("#textArea", "Описание с задержкой отправки");
  });
  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((button) => button.textContent.includes("Создать задачу"))
      ?.click();
  });
  await new Promise((resolve) => setTimeout(resolve, 800));

  check(
    await page.evaluate(
      () =>
        [...document.querySelectorAll("button")].find((button) =>
          button.textContent.includes("Создаем"),
        )?.disabled === true,
    ),
    "отправка: кнопка «Создать задачу» заблокирована во время отправки",
  );

  // Клик по фону во время отправки не должен закрывать форму
  await clickOverlay();
  await new Promise((resolve) => setTimeout(resolve, 500));
  state = await isOnBoard();
  check(state.hasNewCard, "отправка: форма не закрывается во время отправки");

  page.off("request", delayHandler);
  await page.setRequestInterception(false);

  check(
    pageErrors.length === 0,
    `нет ошибок выполнения: ${pageErrors.join(" | ")}`,
  );
} catch (error) {
  failures.push(`FAIL: исключение — ${error.message}`);
} finally {
  await browser.close();
  servers.stop();

  report(results, failures);
}
