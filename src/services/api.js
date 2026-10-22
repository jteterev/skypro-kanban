const BASE_URL =
  import.meta.env.VITE_API_URL || "https://wedev-api.sky.pro/api";
const REQUEST_TIMEOUT = 15000;

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function getErrorMessage(response) {
  const fallback = `Ошибка запроса (${response.status})`;

  try {
    const text = await response.text();
    if (!text) return fallback;

    const data = JSON.parse(text);
    return data.error || data.errorMessage || data.message || fallback;
  } catch {
    return fallback;
  }
}

export async function request(path, { method = "GET", token, body } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new ApiError("Сервер не отвечает, попробуйте позже");
    }

    throw new ApiError("Сервер недоступен, проверьте подключение к интернету");
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response), response.status);
  }

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError("Сервер вернул некорректный ответ", response.status);
  }
}
