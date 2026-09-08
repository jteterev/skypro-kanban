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
} from "./RegisterPage.styled";

function RegisterPage({ onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    // Регистрация через UI: меняем isAuth и переходим на доску
    onLogin();
    navigate("/", { replace: true });
  };

  return (
    <AuthContainerStyled>
      <AuthModalStyled>
        <AuthBlockStyled>
          <AuthTitleStyled>
            <h2>Регистрация</h2>
          </AuthTitleStyled>
          <AuthFormStyled onSubmit={handleSubmit}>
            <AuthInputStyled
              type="text"
              name="name"
              id="formRegName"
              placeholder="Имя"
              value={name}
              onChange={handleNameChange}
            />
            <AuthInputStyled
              type="email"
              name="login"
              id="formRegEmail"
              placeholder="Эл. почта"
              value={email}
              onChange={handleEmailChange}
            />
            <AuthInputStyled
              type="password"
              name="password"
              id="formRegPass"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
            {error && <p className="auth__error">{error}</p>}
            <AuthActionsStyled>
              <AuthFormGroupStyled>
                <AuthButtonStyled type="submit" id="btnReg">
                  Зарегистрироваться
                </AuthButtonStyled>
              </AuthFormGroupStyled>
              <AuthFormGroupStyled>
                <p>
                  Уже есть аккаунт?{" "}
                  <AuthLinkStyled to="/login">Войдите здесь</AuthLinkStyled>
                </p>
              </AuthFormGroupStyled>
            </AuthActionsStyled>
          </AuthFormStyled>
        </AuthBlockStyled>
      </AuthModalStyled>
    </AuthContainerStyled>
  );
}

export default RegisterPage;
