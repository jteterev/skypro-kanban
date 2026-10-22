import { request } from "./api";

export function registerUser({ login, name, password }) {
  return request("/user", {
    method: "POST",
    body: { login, name, password },
  });
}

export function loginUser({ login, password }) {
  return request("/user/login", {
    method: "POST",
    body: { login, password },
  });
}
