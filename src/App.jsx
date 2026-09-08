import { useState } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { PopExitStyles } from "./styles/PopupStyles";
import { WrapperStyled } from "./App.styled";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";

function App() {
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);

  return (
    <WrapperStyled>
      <GlobalStyles />
      {/* pop-up start*/}

      <PopExitStyles id="popExit">
        <div className="pop-exit__container">
          <div className="pop-exit__block">
            <div className="pop-exit__ttl">
              <h2>Выйти из аккаунта?</h2>
            </div>
            <form className="pop-exit__form" id="formExit" action="#">
              <div className="pop-exit__form-group">
                <button className="pop-exit__exit-yes _hover01" id="exitYes">
                  <a href="modal/signin.html">Да, выйти</a>{" "}
                </button>
                <button className="pop-exit__exit-no _hover03" id="exitNo">
                  <a href="main.html">Нет, остаться</a>{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </PopExitStyles>

      <PopNewCard
        isOpen={isPopNewCardOpen}
        onClose={() => setIsPopNewCardOpen(false)}
      />
      <PopBrowse
        isOpen={isPopBrowseOpen}
        onClose={() => setIsPopBrowseOpen(false)}
      />

      {/* pop-up end*/}

      <Header onOpenNewCard={() => setIsPopNewCardOpen(true)} />
      <Main onOpenBrowse={() => setIsPopBrowseOpen(true)} />
    </WrapperStyled>
  );
}

export default App;
