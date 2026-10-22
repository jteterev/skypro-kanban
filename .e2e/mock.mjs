import http from "node:http";

// Демо-пользователи и их задачи нужны, чтобы сайт можно было открыть
// вручную: реальный API недоступен из тестового окружения.
const users = [
  {
    _id: "user-demo",
    login: "demo@mail.ru",
    name: "Демо пользователь",
    password: "demo1234",
    token: "token-demo",
  },
];

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

const state = {
  tasks: demoTasks,
  failure: null,
  down: false,
  lastBody: null,
  delay: 0,
};

// Пароль наружу не отдаём
const publicUser = (user) => ({
  _id: user._id,
  login: user.login,
  name: user.name,
  token: user.token,
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

const readBody = (request) =>
  new Promise((resolve) => {
    let raw = "";
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;

      if (!raw) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        // Некорректный JSON не должен ронять mock-сервер
        resolve(null);
      }
    };

    // Поток мог завершиться до того, как мы подписались на события
    if (request.readableEnded || request.complete) {
      finish();
      return;
    }

    request.on("data", (chunk) => {
      raw += chunk;
    });
    request.on("end", finish);
    request.on("error", finish);
    request.on("close", finish);
  });

/** Тело нужно только методам, которые его действительно отправляют. */
const readBodyIfNeeded = (request) =>
  request.method === "POST" || request.method === "PUT"
    ? readBody(request)
    : Promise.resolve(null);

const json = (response, status, data) => {
  response.writeHead(status, {
    "Content-Type": "application/json",
    // Тесты проверяют свежее состояние, кэш браузера только мешает
    "Cache-Control": "no-store",
    ...cors,
  });
  response.end(data === null ? "" : JSON.stringify(data));
};

const server = http.createServer(async (request, response) => {
  const path = new URL(request.url, "http://127.0.0.1").pathname;

  // Подробный лог включается переменной окружения, чтобы не мешать выводу тестов
  if (process.env.E2E_MOCK_VERBOSE) {
    const startedAt = Date.now();
    const tag = `${request.method} ${path}`;
    console.log(`[mock] START ${tag} delay=${state.delay}`);
    response.on("finish", () =>
      console.log(`[mock] FINISH ${tag} (+${Date.now() - startedAt}ms)`),
    );
    response.on("close", () =>
      console.log(`[mock] CLOSE ${tag} (+${Date.now() - startedAt}ms)`),
    );
    response.on("error", (error) =>
      console.log(`[mock] ERROR ${tag} ${error.message}`),
    );
  }

  if (path === "/__control") {
    if (request.method === "POST") {
      Object.assign(state, await readBody(request));
      json(response, 200, { ok: true });
      return;
    }

    json(response, 200, state);
    return;
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, cors);
    response.end();
    return;
  }

  if (state.down) {
    request.destroy();
    return;
  }

  const apiPath = path.replace("/api", "");
  const id = apiPath.split("/").filter(Boolean)[1];
  const method = request.method;

  // Тело читаем до задержки: иначе поток запроса успевает завершиться
  // и ответ для клиента никогда не отправляется
  const body = await readBodyIfNeeded(request);

  // Искусственная задержка нужна, чтобы проверить состояние загрузки
  if (state.delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, state.delay));
  }

  if (state.failure && state.failure.method === method) {
    json(response, state.failure.status, { error: state.failure.message });
    return;
  }

  if (method === "GET" && apiPath === "/kanban") {
    json(response, 200, { tasks: state.tasks });
    return;
  }

  // Регистрация: POST /user
  if (method === "POST" && apiPath === "/user") {
    const existing = users.find((user) => user.login === body?.login);

    if (existing) {
      json(response, 409, {
        error: "Пользователь с таким логином уже существует",
      });
      return;
    }

    const user = {
      _id: `user-${Date.now()}`,
      login: body.login,
      name: body.name,
      password: body.password,
      token: `token-${Date.now()}`,
    };

    users.push(user);
    json(response, 201, { user: publicUser(user) });
    return;
  }

  // Вход: POST /user/login
  if (method === "POST" && apiPath === "/user/login") {
    const user = users.find(
      (item) => item.login === body?.login && item.password === body?.password,
    );

    if (!user) {
      json(response, 401, { error: "Неверный логин или пароль" });
      return;
    }

    json(response, 200, { user: publicUser(user) });
    return;
  }

  if (method === "GET" && id) {
    const task = state.tasks.find((item) => item._id === id);
    json(
      response,
      task ? 200 : 404,
      task ? { task } : { error: "Задача не найдена" },
    );
    return;
  }

  if (method === "POST") {
    state.lastBody = body;
    const task = { _id: `task-${Date.now()}`, ...body };
    state.tasks = [task, ...state.tasks];
    json(response, 201, { tasks: state.tasks });
    return;
  }

  if (method === "PUT" && id) {
    state.lastBody = body;
    state.tasks = state.tasks.map((item) =>
      item._id === id ? { ...item, ...body } : item,
    );
    json(response, 200, { tasks: state.tasks });
    return;
  }

  if (method === "DELETE" && id) {
    state.tasks = state.tasks.filter((item) => item._id !== id);
    json(response, 200, { tasks: state.tasks });
    return;
  }

  json(response, 404, { error: "Неизвестный запрос" });
});

server.listen(4174, "127.0.0.1", () => {
  console.log("mock api ready on 4174");
});
