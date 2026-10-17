import { useNavigate } from "react-router-dom";
import {
  ExitPageStyled,
  ExitContainerStyled,
  ExitBlockStyled,
  ExitTitleStyled,
  ExitFormStyled,
  ExitFormGroupStyled,
  ExitYesButtonStyled,
  ExitNoButtonStyled,
} from "./ExitPage.styled";

// Модальное окно выхода из аккаунта
function ExitPage({ onLogout }) {
  const navigate = useNavigate();

  const handleExitYes = () => {
    // Выход через UI: сбрасываем isAuth и переходим на страницу входа
    onLogout();
    navigate("/login", { replace: true });
  };

  const handleExitNo = () => {
    navigate("/");
  };

  return (
    <ExitPageStyled>
      <ExitContainerStyled>
        <ExitBlockStyled>
          <ExitTitleStyled>
            <h2>Выйти из аккаунта?</h2>
          </ExitTitleStyled>
          <ExitFormStyled>
            <ExitFormGroupStyled>
              <ExitYesButtonStyled type="button" onClick={handleExitYes}>
                Да, выйти
              </ExitYesButtonStyled>
              <ExitNoButtonStyled type="button" onClick={handleExitNo}>
                Нет, остаться
              </ExitNoButtonStyled>
            </ExitFormGroupStyled>
          </ExitFormStyled>
        </ExitBlockStyled>
      </ExitContainerStyled>
    </ExitPageStyled>
  );
}

export default ExitPage;
