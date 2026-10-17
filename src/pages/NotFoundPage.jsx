import {
  NotFoundPageStyled,
  NotFoundContainerStyled,
  NotFoundCodeStyled,
  NotFoundTextStyled,
  NotFoundLinkStyled,
} from "./NotFoundPage.styled";

// Страница 404 — показывается для всех неизвестных маршрутов
function NotFoundPage() {
  return (
    <NotFoundPageStyled>
      <NotFoundContainerStyled>
        <NotFoundCodeStyled>404</NotFoundCodeStyled>
        <NotFoundTextStyled>
          Такой страницы не существует. Проверьте адрес или вернитесь на доску
          задач.
        </NotFoundTextStyled>
        <NotFoundLinkStyled to="/">Вернуться на доску</NotFoundLinkStyled>
      </NotFoundContainerStyled>
    </NotFoundPageStyled>
  );
}

export default NotFoundPage;
