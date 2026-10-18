import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { registerUser } from "../services/auth";
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

function RegisterPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

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
    if (!name.trim() || !login.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Регистрация только через API
      const data = await registerUser({
        login: login.trim(),
        name: name.trim(),
        password: password.trim(),
      });

      // Успех: API возвращает пользователя с токеном — сразу входим
      authLogin(data.user);
      navigate("/", { replace: true });
    } catch (err) {
      // Ошибка: например, пользователь с таким логином уже существует
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
              disabled={isSubmitting}
            />
            <AuthInputStyled
              type="text"
              name="login"
              id="formRegLogin"
              placeholder="Логин"
              value={login}
              onChange={handleLoginChange}
              disabled={isSubmitting}
            />
            <AuthInputStyled
              type="password"
              name="password"
              id="formRegPass"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
            />
            {error && <p className="auth__error">{error}</p>}
            <AuthActionsStyled>
              <AuthFormGroupStyled>
                <AuthButtonStyled
                  type="submit"
                  id="btnReg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Регистрируем..." : "Зарегистрироваться"}
                </AuthButtonStyled>
              </AuthFormGroupStyled>
              <AuthFormGroupStyled>
                <p>Уже есть аккаунт?</p>
                <AuthLinkStyled to="/login">Войдите здесь</AuthLinkStyled>
              </AuthFormGroupStyled>
            </AuthActionsStyled>
          </AuthFormStyled>
        </AuthBlockStyled>
      </AuthModalStyled>
    </AuthContainerStyled>
  );
}

export default RegisterPage;
