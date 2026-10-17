import { useState, useEffect } from "react";
import { getTasks } from "../../services/tasks";
import Column from "../Column/Column";
import Card from "../Card/Card";
import {
  MainStyled,
  MainBlockStyled,
  MainContentStyled,
  MainColumnStyled,
  LoadingStyled,
  ErrorStyled,
  ErrorButtonStyled,
} from "./Main.styled";

// refreshKey меняется, когда дочерние страницы (создание/редактирование/
// удаление задачи) просят доску перезагрузить список задач
function Main({ user, refreshKey }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  // Задачи приходят только с сервера
  useEffect(() => {
    let cancelled = false;

    getTasks(user.token)
      .then((data) => {
        if (!cancelled) {
          setCards(data.tasks || []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Повторная загрузка после ошибки
  const handleRetry = () => {
    setIsLoading(true);
    setError("");

    getTasks(user.token)
      .then((data) => {
        setCards(data.tasks || []);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const statusColumns = [
    { key: "Без статуса", label: "Без статуса" },
    { key: "Нужно сделать", label: "Нужно сделать" },
    { key: "В работе", label: "В работе" },
    { key: "Тестирование", label: "Тестирование" },
    { key: "Готово", label: "Готово" },
  ];

  const getCardsByStatus = (status) => {
    return cards.filter((card) => card.status === status);
  };

  if (isLoading) {
    return (
      <MainStyled>
        <div className="container">
          <MainBlockStyled>
            <LoadingStyled>Данные загружаются...</LoadingStyled>
          </MainBlockStyled>
        </div>
      </MainStyled>
    );
  }

  if (error) {
    return (
      <MainStyled>
        <div className="container">
          <MainBlockStyled>
            <ErrorStyled>
              <p>{error}</p>
              <ErrorButtonStyled type="button" onClick={handleRetry}>
                Повторить
              </ErrorButtonStyled>
            </ErrorStyled>
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
                    <Card key={card._id || card.id} card={card} />
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
