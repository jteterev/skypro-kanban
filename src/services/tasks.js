import { request } from "./api";

export function getTasks(token) {
  return request("/kanban", { token });
}

export function getTaskById(token, id) {
  return request(`/kanban/${id}`, { token });
}

export function addTask(token, task) {
  return request("/kanban", { method: "POST", token, body: task });
}

export function editTask(token, id, task) {
  return request(`/kanban/${id}`, { method: "PUT", token, body: task });
}

export function deleteTask(token, id) {
  return request(`/kanban/${id}`, { method: "DELETE", token });
}
