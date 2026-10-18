import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NewCardPage from "../pages/NewCardPage";
import CardPage from "../pages/CardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Доска — общий родительский маршрут, всегда остается на фоне.
          Защита на родителе покрывает и все вложенные маршруты */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        {/* Вложенные страницы рендерятся через <Outlet /> поверх доски */}
        <Route path="new-card" element={<NewCardPage />} />
        <Route path="card/:id" element={<CardPage />} />
        <Route path="exit" element={<ExitPage />} />
      </Route>

      {/* Страницы авторизации — авторизованного пользователя
          всегда пересылает на главную */}
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuth ? <Navigate to="/" replace /> : <RegisterPage />}
      />

      {/* Любой неизвестный маршрут ведет на 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
