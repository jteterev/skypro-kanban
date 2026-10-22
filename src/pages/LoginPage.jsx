import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";
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

function LoginPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!login.trim() || !password.trim()) {
      setError("Заполните логин и пароль");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const data = await loginUser({
        login: login.trim(),
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
          <h2>Вход</h2>
        </AuthTitleStyled>
        <AuthFormStyled onSubmit={handleSubmit} noValidate>
          <AuthInputStyled
            type="text"
            name="login"
            id="formloginLogin"
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
            id="formloginPass"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            disabled={isSubmitting}
            autoComplete="current-password"
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
                id="btnLogin"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Входим..." : "Войти"}
              </AuthButtonStyled>
            </AuthFormGroupStyled>
            <AuthFormGroupStyled>
              <p>Нужно зарегистрироваться?</p>
              <AuthLinkStyled to="/register">
                Регистрируйтесь здесь
              </AuthLinkStyled>
            </AuthFormGroupStyled>
          </AuthActionsStyled>
        </AuthFormStyled>
      </AuthBlockStyled>
    </AuthContainerStyled>
  );
}

export default LoginPage;
