import { useState } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopNewCard from "../components/popups/PopNewCard/PopNewCard";

// Главная страница — доска с карточками.
// Вся логика доски находится во вложенном компоненте Main
function HomePage() {
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);

  return (
    <>
      <Header onOpenNewCard={() => setIsPopNewCardOpen(true)} />
      <Main />
      <PopNewCard
        isOpen={isPopNewCardOpen}
        onClose={() => setIsPopNewCardOpen(false)}
      />
    </>
  );
}

export default HomePage;
