import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NewCardPage from "../pages/NewCardPage";
import CardPage from "../pages/CardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes({ isAuth, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Защищенные маршруты — доступны только при isAuth === true */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-card"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <NewCardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ExitPage onLogout={onLogout} />
          </ProtectedRoute>
        }
      />

      {/* Страницы авторизации — авторизованного пользователя
          всегда пересылает на главную */}
      <Route
        path="/login"
        element={
          isAuth ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={onLogin} />
          )
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
