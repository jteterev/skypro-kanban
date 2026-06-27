import { useState, useEffect } from "react";
import { cardList } from "../../data";
import Column from "../Column/Column";
import Card from "../Card/Card";

function Main() {
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
      <main className="main">
        <div className="container">
          <div className="main__block">
            <div className="loading">Данные загружаются</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {statusColumns.map((column) => (
              <Column key={column.key} title={column.label}>
                {getCardsByStatus(column.key).map((card) => (
                  <Card key={card.id} card={card} />
                ))}
              </Column>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
