import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";
import Calendar from "../components/Calendar/Calendar";
import Loader from "../components/Loader/Loader";
import { statuses, defaultStatus, topicMap } from "../data";
import { getTaskById } from "../services/tasks";
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
  CardButtonStyled,
  CardCloseButtonStyled,
  CardErrorStyled,
  CardSaveErrorStyled,
} from "./CardPage.styled";

function CardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { editTask, deleteTask } = useContext(TaskContext);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [card, setCard] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [date, setDate] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCard = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const data = await getTaskById(user.token, id);
        if (cancelled) return;

        const task = data?.task;
        if (!task) {
          setLoadError("Задача не найдена");
          return;
        }

        setCard(task);
        setTitle(task.title || "");
        setDescription(task.description || "");
        setStatus(statuses.includes(task.status) ? task.status : defaultStatus);
        setDate(task.date || "");
      } catch (err) {
        if (cancelled) return;
        setLoadError(err.status === 404 ? "Задача не найдена" : err.message);
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
  }, [id, user.token]);

  const resetForm = () => {
    setTitle(card.title || "");
    setDescription(card.description || "");
    setStatus(statuses.includes(card.status) ? card.status : defaultStatus);
    setDate(card.date || "");
    setFormError("");
  };

  const handleEditClick = () => {
    resetForm();
    setIsEditing(true);
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
  };

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setFormError("Введите название задачи");
      return;
    }

    if (!trimmedDescription) {
      setFormError("Введите описание задачи");
      return;
    }

    if (!date) {
      setFormError("Выберите дату задачи");
      return;
    }

    setIsSaving(true);
    setFormError("");

    const updatedTask = {
      title: trimmedTitle,
      topic: card.topic,
      status,
      description: trimmedDescription,
      date,
    };

    try {
      await editTask(user.token, id, updatedTask);
      setCard((prevCard) => ({ ...prevCard, ...updatedTask }));
      setTitle(updatedTask.title);
      setDescription(updatedTask.description);
      setIsEditing(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setFormError("");

    try {
      await deleteTask(user.token, id);
      navigate("/", { replace: true });
    } catch (err) {
      setFormError(err.message);
      setIsDeleting(false);
    }
  };

  const isBusy = isSaving || isDeleting;

  if (isLoading) {
    return (
      <CardPageStyled>
        <ContainerStyled>
          <CardBlockStyled>
            <Loader label="Загружаем задачу..." />
          </CardBlockStyled>
        </ContainerStyled>
      </CardPageStyled>
    );
  }

  if (loadError) {
    return (
      <CardPageStyled>
        <ContainerStyled>
          <CardBlockStyled>
            <CardIdStyled>ID задачи: {id}</CardIdStyled>
            <CardTitleStyled>{loadError}</CardTitleStyled>
            <CardErrorStyled>
              <CardCloseButtonStyled
                type="button"
                onClick={() => navigate("/")}
              >
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название задачи..."
                aria-label="Название задачи"
                autoFocus
              />
            ) : (
              <CardTitleStyled>{card.title}</CardTitleStyled>
            )}
            <CardThemeStyled className={topicMap[card.topic] || "_gray"}>
              <p>{card.topic || "Без категории"}</p>
            </CardThemeStyled>
          </CardTopBlockStyled>

          <CardStatusStyled>
            <p className="status__p subttl">Статус</p>
            <div className="status__themes">
              {statuses.map((item) => (
                <CardStatusThemeStyled
                  key={item}
                  className={status === item ? "_active-status" : ""}
                  onClick={isEditing ? () => setStatus(item) : undefined}
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
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите описание задачи..."
                    aria-label="Описание задачи"
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
                  {formatDate(date) || "Не указана"}
                </p>
              </div>
            </CardFormStyled>
            <Calendar value={date} onChange={isEditing ? setDate : undefined} />
          </CardWrapStyled>

          {formError && (
            <CardSaveErrorStyled role="alert">{formError}</CardSaveErrorStyled>
          )}

          <CardBtnBrowseStyled>
            {isEditing ? (
              <div className="btn-group">
                <CardButtonStyled
                  type="button"
                  onClick={handleSave}
                  disabled={isBusy}
                >
                  {isSaving ? "Сохраняем..." : "Сохранить"}
                </CardButtonStyled>
                <CardButtonStyled
                  type="button"
                  onClick={handleCancel}
                  disabled={isBusy}
                >
                  Отменить
                </CardButtonStyled>
              </div>
            ) : (
              <div className="btn-group">
                <CardButtonStyled
                  type="button"
                  onClick={handleEditClick}
                  disabled={isBusy}
                >
                  Редактировать задачу
                </CardButtonStyled>
                <CardButtonStyled
                  type="button"
                  onClick={handleDelete}
                  disabled={isBusy}
                >
                  {isDeleting ? "Удаляем..." : "Удалить задачу"}
                </CardButtonStyled>
              </div>
            )}
            <CardCloseButtonStyled
              type="button"
              onClick={() => navigate("/")}
              disabled={isBusy}
            >
              Закрыть
            </CardCloseButtonStyled>
          </CardBtnBrowseStyled>
        </CardBlockStyled>
      </ContainerStyled>
    </CardPageStyled>
  );
}

export default CardPage;
