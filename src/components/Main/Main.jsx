import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TaskContext } from "../../contexts/TaskContext";
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

function Main() {
  const { user } = useContext(AuthContext);
  // Задачи и состояние загрузки приходят из контекста задач
  const { tasks, isLoading, error, getTasks } = useContext(TaskContext);

  // Задачи приходят только с сервера — загружаем один раз при монтировании
  useEffect(() => {
    getTasks(user.token);
  }, [getTasks, user.token]);

  // Повторная загрузка после ошибки
  const handleRetry = () => {
    getTasks(user.token);
  };

  const statusColumns = [
    { key: "Без статуса", label: "Без статуса" },
    { key: "Нужно сделать", label: "Нужно сделать" },
    { key: "В работе", label: "В работе" },
    { key: "Тестирование", label: "Тестирование" },
    { key: "Готово", label: "Готово" },
  ];

  const getCardsByStatus = (status) => {
    return tasks.filter((card) => card.status === status);
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
