import { AuthContainerStyled, AuthBlockStyled } from "./AuthPage.styled";
import {
  NotFoundCodeStyled,
  NotFoundTextStyled,
  NotFoundLinkStyled,
} from "./NotFoundPage.styled";

function NotFoundPage() {
  return (
    <AuthContainerStyled>
      <AuthBlockStyled>
        <NotFoundCodeStyled>404</NotFoundCodeStyled>
        <NotFoundTextStyled>
          Такой страницы не существует. Проверьте адрес или вернитесь на главную
          страницу.
        </NotFoundTextStyled>
        <NotFoundLinkStyled to="/">Вернуться на главную</NotFoundLinkStyled>
      </AuthBlockStyled>
    </AuthContainerStyled>
  );
}

export default NotFoundPage;
