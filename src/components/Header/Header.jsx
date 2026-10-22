import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderStyled,
  HeaderBlockStyled,
  HeaderLogoStyled,
  HeaderNavStyled,
  HeaderBtnNewStyled,
  HeaderUserStyled,
} from "./Header.styled";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!isUserMenuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((isOpen) => !isOpen);
  };

  const handleOpenNewCard = () => {
    setIsUserMenuOpen(false);
    navigate("/new-card");
  };

  return (
    <HeaderStyled>
      <div className="container">
        <HeaderBlockStyled>
          <HeaderLogoStyled>
            <Link to="/" aria-label="На главную">
              <img src="/logo.png" alt="Канбан-доска" />
            </Link>
          </HeaderLogoStyled>
          <HeaderNavStyled ref={navRef}>
            <HeaderBtnNewStyled
              type="button"
              id="btnMainNew"
              onClick={handleOpenNewCard}
            >
              Создать новую задачу
            </HeaderBtnNewStyled>
            <HeaderUserStyled
              type="button"
              onClick={toggleUserMenu}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              {user ? user.name || user.login : ""}
            </HeaderUserStyled>
            <PopUser
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            />
          </HeaderNavStyled>
        </HeaderBlockStyled>
      </div>
    </HeaderStyled>
  );
}

export default Header;
