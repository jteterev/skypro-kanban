import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleOpenNewCard = () => {
    setIsUserMenuOpen(false);
    onOpenNewCard ? onOpenNewCard() : navigate("/new-card");
  };

  return (
    <HeaderStyled>
      <div className="container">
        <HeaderBlockStyled>
          <HeaderLogoStyled className="_show _light">
            <Link to="/">
              <img src="logo.png" alt="logo" />
            </Link>
          </HeaderLogoStyled>
          <HeaderLogoStyled className="_dark">
            <Link to="/">
              <img src="logo_dark.png" alt="logo" />
            </Link>
          </HeaderLogoStyled>
          <HeaderNavStyled>
            <HeaderBtnNewStyled id="btnMainNew" onClick={handleOpenNewCard}>
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
