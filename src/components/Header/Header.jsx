import { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="" target="_self">
              <img src="logo.png" alt="logo" />
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="" target="_self">
              <img src="logo_dark.png" alt="logo" />
            </a>
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new _hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>
            <span className="header__user _hover02" onClick={toggleUserMenu}>
              Ivan Ivanov
            </span>
            <PopUser isOpen={isUserMenuOpen} />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
