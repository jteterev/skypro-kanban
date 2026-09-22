import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
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
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация полей формы
    if (!login.trim() || !password.trim()) {
      setError("Заполните логин и пароль");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Авторизация только через API
      const data = await loginUser({
        login: login.trim(),
        password: password.trim(),
      });

      // Успех: сохраняем пользователя с токеном и переходим на доску
      onLogin(data.user);
      navigate("/", { replace: true });
    } catch (err) {
      // Ошибка: показываем сообщение пользователю
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
              type="text"
              name="login"
              id="formloginLogin"
              placeholder="Логин"
              value={login}
              onChange={handleLoginChange}
              disabled={isSubmitting}
            />
            <AuthInputStyled
              type="password"
              name="password"
              id="formloginPass"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
            />
            {error && <p className="auth__error">{error}</p>}
            <AuthActionsStyled>
              <AuthFormGroupStyled>
                <AuthButtonStyled type="submit" id="btnLogin" disabled={isSubmitting}>
                  {isSubmitting ? "Входим..." : "Войти"}
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
