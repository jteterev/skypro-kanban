import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { registerUser } from "../services/auth";
import {
  AuthContainerStyled,
  AuthBlockStyled,
  AuthTitleStyled,
  AuthFormStyled,
  AuthInputStyled,
  AuthActionsStyled,
  AuthFormGroupStyled,
  AuthButtonStyled,
  AuthLinkStyled,
} from "./AuthPage.styled";

function RegisterPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!name.trim() || !login.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const data = await registerUser({
        login: login.trim(),
        name: name.trim(),
        password,
      });

      authLogin(data.user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainerStyled>
      <AuthBlockStyled>
        <AuthTitleStyled>
          <h2>Регистрация</h2>
        </AuthTitleStyled>
        <AuthFormStyled onSubmit={handleSubmit} noValidate>
          <AuthInputStyled
            type="text"
            name="name"
            id="formRegName"
            placeholder="Имя"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            disabled={isSubmitting}
            autoComplete="name"
          />
          <AuthInputStyled
            type="text"
            name="login"
            id="formRegLogin"
            placeholder="Логин"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              setError("");
            }}
            disabled={isSubmitting}
            autoComplete="username"
          />
          <AuthInputStyled
            type="password"
            name="password"
            id="formRegPass"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            disabled={isSubmitting}
            autoComplete="new-password"
          />
          {error && (
            <p className="auth__error" role="alert">
              {error}
            </p>
          )}
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
    </AuthContainerStyled>
  );
}

export default RegisterPage;
