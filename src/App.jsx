import { useState } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { WrapperStyled } from "./App.styled";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // Данные пользователя (с Bearer-токеном) приходят только из API.
  // Токен сохраняется в localStorage, чтобы не терять вход после
  // перезагрузки страницы. Смена состояния происходит через useState.
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <WrapperStyled>
      <GlobalStyles />
      <AppRoutes
        isAuth={Boolean(user)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </WrapperStyled>
  );
}

export default App;
