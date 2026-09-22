import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NewCardPage from "../pages/NewCardPage";
import CardPage from "../pages/CardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes({ isAuth, user, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Доска — общий родительский маршрут, всегда остается на фоне.
          Защита на родителе покрывает и все вложенные маршруты */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <HomePage user={user} />
          </ProtectedRoute>
        }
      >
        {/* Вложенные страницы рендерятся через <Outlet /> поверх доски */}
        <Route path="new-card" element={<NewCardPage user={user} />} />
        <Route path="card/:id" element={<CardPage user={user} />} />
        <Route path="exit" element={<ExitPage onLogout={onLogout} />} />
      </Route>

      {/* Страницы авторизации — авторизованного пользователя
          всегда пересылает на главную */}
      <Route
        path="/login"
        element={
          isAuth ? <Navigate to="/" replace /> : <LoginPage onLogin={onLogin} />
        }
      />
      <Route
        path="/register"
        element={
          isAuth ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage onLogin={onLogin} />
          )
        }
      />

      {/* Любой неизвестный маршрут ведет на 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
