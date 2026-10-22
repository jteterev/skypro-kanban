import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { TaskContext } from "../../contexts/TaskContext";
import Column from "../Column/Column";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import { statuses, defaultStatus } from "../../data";
import { Palette } from "../../styles/palette";
import {
  MainStyled,
  MainBlockStyled,
  MainContentStyled,
  ErrorStyled,
  ErrorButtonStyled,
  EmptyStateStyled,
  EmptyTitleStyled,
  EmptyTextStyled,
  EmptyButtonStyled,
  EmptyIconStyled,
} from "./Main.styled";

function Main() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { tasks, isLoading, error, getTasks } = useContext(TaskContext);

  useEffect(() => {
    getTasks(user.token);
  }, [getTasks, user.token]);

  const handleRetry = () => {
    getTasks(user.token);
  };

  const getCardsByStatus = (status) =>
    tasks.filter((card) => {
      const cardStatus = statuses.includes(card.status)
        ? card.status
        : defaultStatus;

      return cardStatus === status;
    });

  const isBoardVisible = !isLoading && !error && tasks.length > 0;

  return (
    <MainStyled>
      <div className="container">
        <MainBlockStyled>
          {isLoading && <Loader label="Загружаем задачи..." />}

          {!isLoading && error && (
            <ErrorStyled>
              <p>{error}</p>
              <ErrorButtonStyled type="button" onClick={handleRetry}>
                Повторить
              </ErrorButtonStyled>
            </ErrorStyled>
          )}

          {!isLoading && !error && tasks.length === 0 && (
            <EmptyStateStyled>
              <EmptyIconStyled>
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="8"
                    width="10"
                    height="32"
                    rx="3"
                    fill={Palette.border}
                  />
                  <rect
                    x="19"
                    y="8"
                    width="10"
                    height="22"
                    rx="3"
                    fill={Palette.border}
                  />
                  <rect
                    x="33"
                    y="8"
                    width="10"
                    height="14"
                    rx="3"
                    fill={Palette.border}
                  />
                </svg>
              </EmptyIconStyled>
              <EmptyTitleStyled>Новых задач нет</EmptyTitleStyled>
              <EmptyTextStyled>
                Создайте первую задачу, чтобы начать работу с доской
              </EmptyTextStyled>
              <EmptyButtonStyled
                type="button"
                onClick={() => navigate("/new-card")}
              >
                Создать задачу
              </EmptyButtonStyled>
            </EmptyStateStyled>
          )}

          {isBoardVisible && (
            <MainContentStyled>
              {statuses.map((status) => (
                <Column key={status} title={status}>
                  {getCardsByStatus(status).map((card) => (
                    <Card key={card._id || card.id} card={card} />
                  ))}
                </Column>
              ))}
            </MainContentStyled>
          )}
        </MainBlockStyled>
      </div>
    </MainStyled>
  );
}

export default Main;
