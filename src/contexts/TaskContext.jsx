import { createContext, useCallback, useState } from "react";
import {
  getTasks as getTasksApi,
  addTask as addTaskApi,
  editTask as editTaskApi,
  deleteTask as deleteTaskApi,
} from "../services/tasks";

// Контекст задач — список задач и методы работы с ним.
// Значение формируется хуком useTaskProvider и передается
// в <TaskContext.Provider value={...}> в App.jsx.
export const TaskContext = createContext(null);

// Хук значения контекста задач: список задач в состоянии
// и методы загрузки/создания/изменения/удаления
export function useTaskProvider() {
  const [tasks, setTasks] = useState([]);
  // Доска сразу показывает загрузку, пока не пришли задачи с сервера
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Загрузка списка задач с сервера
  const getTasks = useCallback(async (token) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getTasksApi(token);
      setTasks(data?.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Добавление задачи: API возвращает обновленный список задач
  const addTask = useCallback(async (token, task) => {
    const data = await addTaskApi(token, task);
    setTasks(data?.tasks || []);
  }, []);

  // Изменение задачи: API возвращает обновленный список задач
  const editTask = useCallback(async (token, id, task) => {
    const data = await editTaskApi(token, id, task);
    setTasks(data?.tasks || []);
  }, []);

  // Удаление задачи: API возвращает обновленный список задач
  const deleteTask = useCallback(async (token, id) => {
    const data = await deleteTaskApi(token, id);
    setTasks(data?.tasks || []);
  }, []);

  return {
    tasks,
    isLoading,
    error,
    getTasks,
    addTask,
    editTask,
    deleteTask,
  };
}
