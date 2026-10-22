import { createContext, useCallback, useState } from "react";
import {
  getTasks as getTasksApi,
  addTask as addTaskApi,
  editTask as editTaskApi,
  deleteTask as deleteTaskApi,
} from "../services/tasks";

export const TaskContext = createContext(null);

export function useTaskProvider() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getTasks = useCallback(async (token) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getTasksApi(token);
      setTasks(Array.isArray(data?.tasks) ? data.tasks : []);
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Сервер возвращает обновленный список задач. Если ответ пустой,
  // запрашиваем список заново, чтобы не потерять данные.
  const applyTasks = useCallback(async (data, token) => {
    if (Array.isArray(data?.tasks)) {
      setTasks(data.tasks);
      return;
    }

    const freshData = await getTasksApi(token);
    setTasks(Array.isArray(freshData?.tasks) ? freshData.tasks : []);
  }, []);

  const addTask = useCallback(
    async (token, task) => {
      const data = await addTaskApi(token, task);
      await applyTasks(data, token);
    },
    [applyTasks],
  );

  const editTask = useCallback(
    async (token, id, task) => {
      const data = await editTaskApi(token, id, task);
      await applyTasks(data, token);
    },
    [applyTasks],
  );

  const deleteTask = useCallback(
    async (token, id) => {
      const data = await deleteTaskApi(token, id);
      await applyTasks(data, token);
    },
    [applyTasks],
  );

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
