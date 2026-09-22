const BASE_URL = "https://wedev-api.sky.pro/api";

// Ошибка API с HTTP-статусом, чтобы страницы могли
// различать сценарии (например, 404 — задача не найдена)
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Базовый запрос к API.
// Особенность API: тело передается как JSON-строка БЕЗ заголовка
// Content-Type (API не принимает application/json),
// токен передается в заголовке Authorization: Bearer <token>
export async function request(path, { method = "GET", token, body } = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Сетевая ошибка: сервер недоступен, нет соединения и т.д.
    throw new ApiError("Сервер недоступен, проверьте подключение к интернету");
  }

  if (!response.ok) {
    let message = `Ошибка запроса (${response.status})`;
    try {
      const data = await response.json();
      message = data.error || data.errorMessage || data.message || message;
    } catch {
      // Ответ не в формате JSON — оставляем сообщение по умолчанию
    }
    throw new ApiError(message, response.status);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
