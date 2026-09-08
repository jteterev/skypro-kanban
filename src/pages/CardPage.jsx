import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Calendar from "../components/Calendar/Calendar";
import { cardList, topicMap } from "../data";
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
} from "./CardPage.styled";

const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

// Страница просмотра и редактирования задачи
function CardPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const card = cardList.find((item) => item.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card ? card.title : "");
  const [description, setDescription] = useState(
    card ? card.description || "" : "",
  );
  const [status, setStatus] = useState(card ? card.status : statuses[0]);

  if (!card) {
    return (
      <>
        <Header />
        <CardPageStyled>
          <ContainerStyled>
            <CardBlockStyled>
              <CardIdStyled>ID задачи: {id}</CardIdStyled>
              <CardTitleStyled>Задача с таким id не найдена</CardTitleStyled>
              <CardCloseButtonStyled onClick={() => navigate("/")}>
                Вернуться на доску
              </CardCloseButtonStyled>
            </CardBlockStyled>
          </ContainerStyled>
        </CardPageStyled>
      </>
    );
  }

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
  };

  const handleSave = () => {
    setIsEditing(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
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
                      <p>
                        {description || card.description || "Описание задачи"}
                      </p>
                    </CardAreaViewStyled>
                  )}
                </div>
              </CardFormStyled>
              <Calendar />
            </CardWrapStyled>

            {!isEditing && (
              <CardBtnBrowseStyled>
                <div className="btn-group">
                  <CardButtonStyled type="button" onClick={handleEditClick}>
                    Редактировать задачу
                  </CardButtonStyled>
                  <CardButtonStyled type="button" onClick={handleDelete}>
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
                  <CardButtonStyled type="button" onClick={handleSave}>
                    Сохранить
                  </CardButtonStyled>
                  <CardButtonStyled type="button" onClick={handleCancel}>
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
    </>
  );
}

export default CardPage;
