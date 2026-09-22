import { request } from "./api";

// Регистрация нового пользователя
// Возвращает { user: { token, login, name, ... } }
export function registerUser({ login, name, password }) {
  return request("/user", {
    method: "POST",
    body: { login, name, password },
  });
}

// Авторизация пользователя
// Возвращает { user: { token, login, name, ... } }
export function loginUser({ login, password }) {
  return request("/user/login", {
    method: "POST",
    body: { login, password },
  });
}
