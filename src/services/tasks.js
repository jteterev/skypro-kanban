import { request } from "./api";

// Получить список задач
// Возвращает { tasks: [...] }
export function getTasks(token) {
  return request("/kanban", { token });
}

// Получить задачу по id
// Возвращает { task: {...} }
export function getTaskById(token, id) {
  return request(`/kanban/${id}`, { token });
}

// Добавить задачу
// Возвращает { tasks: [...] } — обновленный список
export function addTask(token, task) {
  return request("/kanban", { method: "POST", token, body: task });
}

// Изменить задачу по id
// Возвращает { tasks: [...] } — обновленный список
export function editTask(token, id, task) {
  return request(`/kanban/${id}`, { method: "PUT", token, body: task });
}

// Удалить задачу по id
// Возвращает { tasks: [...] } — обновленный список
export function deleteTask(token, id) {
  return request(`/kanban/${id}`, { method: "DELETE", token });
}
