import { useState, useEffect } from "react";
import { cardList } from "../../data";
import Column from "../Column/Column";
import Card from "../Card/Card";
import {
  MainStyled,
  MainBlockStyled,
  MainContentStyled,
  MainColumnStyled,
  LoadingStyled,
} from "./Main.styled";

function Main({ onOpenBrowse }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const statusColumns = [
    { key: "Без статуса", label: "Без статуса" },
    { key: "Нужно сделать", label: "Нужно сделать" },
    { key: "В работе", label: "В работе" },
    { key: "Тестирование", label: "Тестирование" },
    { key: "Готово", label: "Готово" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCards(cardList);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getCardsByStatus = (status) => {
    return cards.filter((card) => card.status === status);
  };

  if (isLoading) {
    return (
      <MainStyled>
        <div className="container">
          <MainBlockStyled>
            <LoadingStyled>Данные загружаются</LoadingStyled>
          </MainBlockStyled>
        </div>
      </MainStyled>
    );
  }

  return (
    <MainStyled>
      <div className="container">
        <MainBlockStyled>
          <MainContentStyled>
            {statusColumns.map((column) => (
              <MainColumnStyled key={column.key}>
                <Column title={column.label}>
                  {getCardsByStatus(column.key).map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      onOpenBrowse={() => onOpenBrowse()}
                    />
                  ))}
                </Column>
              </MainColumnStyled>
            ))}
          </MainContentStyled>
        </MainBlockStyled>
      </div>
    </MainStyled>
  );
}

export default Main;
