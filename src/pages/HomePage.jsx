import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

// Главная страница — доска с карточками.
// Родительский маршрут: всегда рендерится на фоне, вложенные
// страницы (/new-card, /card/:id, /exit) выводятся через <Outlet />
// поверх доски.
function HomePage({ user }) {
  // Счетчик версий списка задач: дочерние страницы (создание,
  // редактирование, удаление) вызывают refreshTasks, чтобы доска
  // перезагрузила данные, не размонтируясь сама
  const [tasksKey, setTasksKey] = useState(0);
  const refreshTasks = () => setTasksKey((key) => key + 1);

  return (
    <>
      <Header user={user} />
      <Main user={user} refreshKey={tasksKey} />
      <Outlet context={{ user, refreshTasks }} />
    </>
  );
}

export default HomePage;
