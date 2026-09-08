import { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderStyled,
  HeaderBlockStyled,
  HeaderLogoStyled,
  HeaderNavStyled,
  HeaderBtnNewStyled,
  HeaderUserStyled,
} from "./Header.styled";

function Header({ onOpenNewCard }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <HeaderStyled>
      <div className="container">
        <HeaderBlockStyled>
          <HeaderLogoStyled className="_show _light">
            <a href="" target="_self">
              <img src="logo.png" alt="logo" />
            </a>
          </HeaderLogoStyled>
          <HeaderLogoStyled className="_dark">
            <a href="" target="_self">
              <img src="logo_dark.png" alt="logo" />
            </a>
          </HeaderLogoStyled>
          <HeaderNavStyled>
            <HeaderBtnNewStyled id="btnMainNew" onClick={onOpenNewCard}>
              <a>Создать новую задачу</a>
            </HeaderBtnNewStyled>
            <HeaderUserStyled onClick={toggleUserMenu}>
              Ivan Ivanov
            </HeaderUserStyled>
            <PopUser isOpen={isUserMenuOpen} />
          </HeaderNavStyled>
        </HeaderBlockStyled>
      </div>
    </HeaderStyled>
  );
}

export default Header;
