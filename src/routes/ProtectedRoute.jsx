import { Navigate } from "react-router-dom";

// Защищенный маршрут: неавторизованного пользователя всегда
// пересылает на страницу входа
function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
