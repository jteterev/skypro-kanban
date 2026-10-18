import { createContext, useState } from "react";

// Контекст авторизации — пользователь и методы входа/выхода.
// Значение формируется хуком useAuthProvider и передается
// в <AuthContext.Provider value={...}> в App.jsx.
export const AuthContext = createContext(null);

// Пользователь (с Bearer-токеном) хранится в localStorage,
// чтобы не терять вход после перезагрузки страницы
function getStoredUser() {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Хук значения контекста авторизации: состояние пользователя
// и методы login / logout
export function useAuthProvider() {
  const [user, setUser] = useState(getStoredUser);

  // Вход: сохраняем пользователя с токеном в состояние и localStorage
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Выход: очищаем пользователя и localStorage
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    isAuth: Boolean(user),
    login,
    logout,
  };
}
