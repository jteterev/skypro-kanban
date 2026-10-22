import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  PopUserSetStyled,
  PopUserSetNameStyled,
  PopUserSetMailStyled,
  PopUserSetButtonStyled,
} from "./PopUser.styled";

function PopUser({ isOpen, onClose }) {
  const { user } = useContext(AuthContext);

  return (
    <PopUserSetStyled $isOpen={isOpen} id="user-set-target">
      <PopUserSetNameStyled>
        {user ? user.name || user.login : ""}
      </PopUserSetNameStyled>
      <PopUserSetMailStyled>{user ? user.login : ""}</PopUserSetMailStyled>
      <PopUserSetButtonStyled to="/exit" onClick={onClose}>
        Выйти
      </PopUserSetButtonStyled>
    </PopUserSetStyled>
  );
}

export default PopUser;
