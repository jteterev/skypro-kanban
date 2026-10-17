import { useState, useEffect } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import Calendar from "../components/Calendar/Calendar";
import { topicMap } from "../data";
import { getTaskById, editTask, deleteTask } from "../services/tasks";
import { formatDate } from "../utils/formatDate";
import {
  CardPageStyled,
  ContainerStyled,
  CardBlockStyled,
  CardIdStyled,
  CardTopBlockStyled,
  CardTitleStyled,
  CardTitleInputStyled,
  CardThemeStyled,
  CardStatusStyled,
  CardStatusThemeStyled,
  CardWrapStyled,
  CardFormStyled,
  CardAreaStyled,
  CardAreaViewStyled,
  CardBtnBrowseStyled,
  CardBtnEditStyled,
  CardButtonStyled,
  CardCloseButtonStyled,
  CardErrorStyled,
  CardSaveErrorStyled,
} from "./CardPage.styled";

const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

// Страница просмотра и редактирования задачи — вложенный маршрут
// поверх доски, данные с API
function CardPage({ user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  // refreshTasks приходит от HomePage (родительского маршрута) через
  // Outlet context — заставляет доску перезагрузить задачи
  const { refreshTasks } = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [card, setCard] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Загрузка задачи по id с сервера
  useEffect(() => {
    let cancelled = false;

    const loadCard = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getTaskById(user.token, id);
        if (cancelled) return;

        const task = data.task;
        setCard(task);
        setTitle(task.title);
        setDescription(task.description || "");
        setStatus(statuses.includes(task.status) ? task.status : statuses[0]);
      } catch (err) {
        if (cancelled) return;
        setError(err.status === 404 ? "Задача не найдена" : err.message);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadCard();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSaveError("");
  };

  // Сохранение изменений через API
  const handleSave = async () => {
    if (!title.trim()) {
      setSaveError("Введите название задачи");
      return;
    }

    setIsSaving(true);
    setSaveError("");

    try {
      await editTask(user.token, id, {
        title: title.trim(),
        topic: card.topic,
        status,
        description: description.trim(),
        date: card.date,
      });

      setIsEditing(false);
      refreshTasks();
      navigate("/");
    } catch (err) {
      setSaveError(err.message);
      setIsSaving(false);
    }
  };

  // Удаление задачи через API
  const handleDelete = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      await deleteTask(user.token, id);
      refreshTasks();
      navigate("/");
    } catch (err) {
      setSaveError(err.message);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError("");
    // Возвращаем исходные значения задачи
    setTitle(card.title);
    setDescription(card.description || "");
    setStatus(statuses.includes(card.status) ? card.status : statuses[0]);
  };

  if (isLoading) {
    return (
      <CardPageStyled>
        <ContainerStyled>
          <CardBlockStyled>
            <CardIdStyled>ID задачи: {id}</CardIdStyled>
            <CardTitleStyled>Загрузка...</CardTitleStyled>
          </CardBlockStyled>
        </ContainerStyled>
      </CardPageStyled>
    );
  }

  if (error) {
    return (
      <CardPageStyled>
        <ContainerStyled>
          <CardBlockStyled>
            <CardIdStyled>ID задачи: {id}</CardIdStyled>
            <CardTitleStyled>{error}</CardTitleStyled>
            <CardErrorStyled>
              <CardCloseButtonStyled onClick={() => navigate("/")}>
                Вернуться на доску
              </CardCloseButtonStyled>
            </CardErrorStyled>
          </CardBlockStyled>
        </ContainerStyled>
      </CardPageStyled>
    );
  }

  return (
    <CardPageStyled>
      <ContainerStyled>
        <CardBlockStyled>
          <CardIdStyled>ID задачи: {id}</CardIdStyled>
          <CardTopBlockStyled>
            {isEditing ? (
              <CardTitleInputStyled
                type="text"
                value={title}
                onChange={handleTitleChange}
                autoFocus
              />
            ) : (
              <CardTitleStyled>{card.title}</CardTitleStyled>
            )}
            <CardThemeStyled className={topicMap[card.topic] || "_gray"}>
              <p className={topicMap[card.topic] || "_gray"}>{card.topic}</p>
            </CardThemeStyled>
          </CardTopBlockStyled>
          <CardStatusStyled>
            <p className="status__p subttl">Статус</p>
            <div className="status__themes">
              {statuses.map((item) => (
                <CardStatusThemeStyled
                  key={item}
                  className={status === item ? "_active-status" : ""}
                  onClick={
                    isEditing ? () => handleStatusSelect(item) : undefined
                  }
                >
                  <p>{item}</p>
                </CardStatusThemeStyled>
              ))}
            </div>
          </CardStatusStyled>
          <CardWrapStyled>
            <CardFormStyled>
              <div className="form-browse__block">
                <p className="subttl">Описание задачи</p>
                {isEditing ? (
                  <CardAreaStyled
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Введите описание задачи..."
                  />
                ) : (
                  <CardAreaViewStyled>
                    <p>{description || "Описание отсутствует"}</p>
                  </CardAreaViewStyled>
                )}
              </div>
              <div className="form-browse__date">
                <p className="subttl">Дата</p>
                <p className="form-browse__date-value">
                  {formatDate(card.date)}
                </p>
              </div>
            </CardFormStyled>
            <Calendar />
          </CardWrapStyled>

          {saveError && <CardSaveErrorStyled>{saveError}</CardSaveErrorStyled>}

          {!isEditing && (
            <CardBtnBrowseStyled>
              <div className="btn-group">
                <CardButtonStyled type="button" onClick={handleEditClick}>
                  Редактировать задачу
                </CardButtonStyled>
                <CardButtonStyled
                  type="button"
                  onClick={handleDelete}
                  disabled={isSaving}
                >
                  Удалить задачу
                </CardButtonStyled>
              </div>
              <CardCloseButtonStyled onClick={() => navigate("/")}>
                Закрыть
              </CardCloseButtonStyled>
            </CardBtnBrowseStyled>
          )}

          {isEditing && (
            <CardBtnEditStyled>
              <div className="btn-group">
                <CardButtonStyled
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Сохраняем..." : "Сохранить"}
                </CardButtonStyled>
                <CardButtonStyled
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Отменить
                </CardButtonStyled>
              </div>
              <CardCloseButtonStyled onClick={() => navigate("/")}>
                Закрыть
              </CardCloseButtonStyled>
            </CardBtnEditStyled>
          )}
        </CardBlockStyled>
      </ContainerStyled>
    </CardPageStyled>
  );
}

export default CardPage;
