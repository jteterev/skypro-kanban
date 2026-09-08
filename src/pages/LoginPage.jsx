import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContainerStyled,
  AuthModalStyled,
  AuthBlockStyled,
  AuthTitleStyled,
  AuthFormStyled,
  AuthInputStyled,
  AuthActionsStyled,
  AuthFormGroupStyled,
  AuthButtonStyled,
  AuthLinkStyled,
} from "./LoginPage.styled";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    // Вход через UI: меняем isAuth и переходим на доску без перезагрузки
    onLogin();
    navigate("/", { replace: true });
  };

  return (
    <AuthContainerStyled>
      <AuthModalStyled>
        <AuthBlockStyled>
          <AuthTitleStyled>
            <h2>Вход</h2>
          </AuthTitleStyled>
          <AuthFormStyled onSubmit={handleSubmit}>
            <AuthInputStyled
              type="email"
              name="email"
              id="formloginEmail"
              placeholder="Эл. почта"
              value={email}
              onChange={handleEmailChange}
            />
            <AuthInputStyled
              type="password"
              name="password"
              id="formloginPass"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
            {error && <p className="auth__error">{error}</p>}
            <AuthActionsStyled>
              <AuthFormGroupStyled>
                <AuthButtonStyled type="submit" id="btnLogin">
                  Войти
                </AuthButtonStyled>
              </AuthFormGroupStyled>
              <AuthFormGroupStyled>
                <p className="auth-register-text">Нужно зарегистрироваться?</p>
                <AuthLinkStyled to="/register">
                  Регистрируйтесь здесь
                </AuthLinkStyled>
              </AuthFormGroupStyled>
            </AuthActionsStyled>
          </AuthFormStyled>
        </AuthBlockStyled>
      </AuthModalStyled>
    </AuthContainerStyled>
  );
}

export default LoginPage;
