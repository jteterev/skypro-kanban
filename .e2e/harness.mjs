// Общая обвязка E2E-прогонов: поднимает mock API и dev-сервер Vite,
// ждёт их готовности и корректно останавливает по завершении.
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");

export const MOCK_PORT = 4174;
export const APP_PORT = 4175;

export const BASE = `http://127.0.0.1:${APP_PORT}`;
export const CONTROL = `http://127.0.0.1:${MOCK_PORT}/__control`;
export const API_URL = `http://127.0.0.1:${MOCK_PORT}/api`;

export const CHROME_PATH =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const waitForUrl = async (url, { attempts, delay, label }) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // сервер ещё поднимается
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error(`${label} не запустился: ${url}`);
};

const spawnProcess = (command, args, options = {}) =>
  spawn(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    ...options,
  });

/** Проверяет, что порт свободен, иначе сообщает, какой процесс его держит. */
const ensurePortIsFree = async (port, label) => {
  try {
    await fetch(`http://127.0.0.1:${port}/`);
  } catch {
    // Соединение не удалось — порт свободен
    return;
  }

  throw new Error(
    `порт ${port} уже занят (${label}). Остановите процесс и повторите прогон.`,
  );
};

/**
 * Поднимает mock API (4174) и dev-сервер Vite (4175) для одного прогона.
 * @returns {Promise<{ stop: () => void }>}
 */
export const startServers = async () => {
  await ensurePortIsFree(MOCK_PORT, "mock API");
  await ensurePortIsFree(APP_PORT, "dev-сервер");

  const mock = spawnProcess(process.execPath, [path.join(here, "mock.mjs")]);
  const vite = spawnProcess(
    process.execPath,
    [
      path.join(projectRoot, "node_modules", "vite", "bin", "vite.js"),
      "--port",
      String(APP_PORT),
      "--strictPort",
      "--host",
      "127.0.0.1",
    ],
    { env: { ...process.env, VITE_API_URL: API_URL } },
  );

  const stop = () => {
    mock.kill();
    vite.kill();
  };

  try {
    await waitForUrl(CONTROL, {
      attempts: 50,
      delay: 100,
      label: "mock API",
    });
    await waitForUrl(BASE, {
      attempts: 100,
      delay: 200,
      label: "dev-сервер",
    });
  } catch (error) {
    stop();
    throw error;
  }

  return { stop };
};

/** Сбрасывает состояние mock-сервера, чтобы доска на прогоне была одинаковой. */
export const resetServer = async (state) => {
  const response = await fetch(CONTROL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });

  if (!response.ok) throw new Error("не удалось сбросить состояние мока");
};

/** Печатает итог прогона и выставляет код выхода. */
export const report = (results, failures) => {
  console.log(results.join("\n"));
  console.log("\n--- FAILURES ---");
  console.log(failures.length ? failures.join("\n") : "нет");
  console.log(
    `\nИтого: ${results.length} успешно, ${failures.length} провалено`,
  );
  process.exitCode = failures.length ? 1 : 0;
};
