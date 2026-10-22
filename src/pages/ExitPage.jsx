import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  ExitPageStyled,
  ExitBlockStyled,
  ExitTitleStyled,
  ExitFormGroupStyled,
  ExitYesButtonStyled,
  ExitNoButtonStyled,
} from "./ExitPage.styled";

function ExitPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleExitYes = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <ExitPageStyled>
      <ExitBlockStyled>
        <ExitTitleStyled>
          <h2>Выйти из аккаунта?</h2>
        </ExitTitleStyled>
        <ExitFormGroupStyled>
          <ExitYesButtonStyled type="button" onClick={handleExitYes}>
            Да, выйти
          </ExitYesButtonStyled>
          <ExitNoButtonStyled type="button" onClick={() => navigate("/")}>
            Нет, остаться
          </ExitNoButtonStyled>
        </ExitFormGroupStyled>
      </ExitBlockStyled>
    </ExitPageStyled>
  );
}

export default ExitPage;
