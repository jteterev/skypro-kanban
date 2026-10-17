import { Link } from "react-router-dom";
import {
  PopUserSetStyled,
  PopUserSetNameStyled,
  PopUserSetMailStyled,
  PopUserSetThemeStyled,
  PopUserSetButtonStyled,
} from "./PopUser.styled";

function PopUser({ user, isOpen }) {
  return (
    <PopUserSetStyled
      className={`${isOpen ? " show" : ""}`}
      id="user-set-target"
    >
      <PopUserSetNameStyled>{user ? user.name || user.login : ""}</PopUserSetNameStyled>
      <PopUserSetMailStyled>{user ? user.login : ""}</PopUserSetMailStyled>
      <PopUserSetThemeStyled>
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox" />
      </PopUserSetThemeStyled>
      <PopUserSetButtonStyled type="button" className="_hover03">
        <Link to="/exit">Выйти</Link>
      </PopUserSetButtonStyled>
    </PopUserSetStyled>
  );
}

export default PopUser;
