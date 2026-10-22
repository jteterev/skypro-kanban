import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function getStoredUser() {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function useAuthProvider() {
  const [user, setUser] = useState(getStoredUser);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    isAuth: Boolean(user?.token),
    login,
    logout,
  };
}
