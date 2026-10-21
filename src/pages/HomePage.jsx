import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

// Главная страница — доска с карточками.
// Родительский маршрут: всегда рендерится на фоне, вложенные
// страницы (/new-card, /card/:id, /exit) выводятся через <Outlet />
// поверх доски. Данные пользователя и задачи приходят из контекста.
function HomePage() {
  return (
    <>
      <Header />
      <Main />
      <Outlet />
    </>
  );
}

export default HomePage;
