import { useState } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { WrapperStyled } from "./App.styled";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // Состояние авторизации меняется только через UI
  // (страницы входа/регистрации и модальное окно выхода)
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => setIsAuth(false);

  return (
    <WrapperStyled>
      <GlobalStyles />
      <AppRoutes
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </WrapperStyled>
  );
}

export default App;
