import {
  PopUserSetStyled,
  PopUserSetNameStyled,
  PopUserSetMailStyled,
  PopUserSetThemeStyled,
  PopUserSetButtonStyled,
} from "./PopUser.styled";

function PopUser({ isOpen }) {
  return (
    <PopUserSetStyled
      className={`${isOpen ? " show" : ""}`}
      id="user-set-target"
    >
      <PopUserSetNameStyled>Ivan Ivanov</PopUserSetNameStyled>
      <PopUserSetMailStyled>ivan.ivanov@gmail.com</PopUserSetMailStyled>
      <PopUserSetThemeStyled>
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox" />
      </PopUserSetThemeStyled>
      <PopUserSetButtonStyled type="button" className="_hover03">
        <a href="#popExit">Выйти</a>
      </PopUserSetButtonStyled>
    </PopUserSetStyled>
  );
}

export default PopUser;
