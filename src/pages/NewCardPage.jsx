import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";
import Calendar from "../components/Calendar/Calendar";
import { topicMap } from "../data";
import {
  NewCardPageStyled,
  ContainerStyled,
  NewCardBlockStyled,
  NewCardTitleStyled,
  NewCardWrapStyled,
  NewCardFormStyled,
  NewCardInputStyled,
  NewCardAreaStyled,
  NewCardCategoriesStyled,
  NewCardThemeStyled,
  NewCardCreateButtonStyled,
} from "./NewCardPage.styled";

const topics = ["Web Design", "Research", "Development", "Testing"];

// Страница добавления новой задачи — вложенный маршрут поверх доски
function NewCardPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // addTask из контекста задач обновляет общий список задач
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Валидация полей формы
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Создание задачи через API
      await addTask(user.token, {
        title: title.trim(),
        topic,
        status: "Без статуса",
        description: description.trim(),
        date: new Date().toISOString(),
      });

      // Успех: контекст задач уже обновил список — возвращаемся на доску
      navigate("/");
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <NewCardPageStyled>
      <ContainerStyled>
        <NewCardBlockStyled>
          <NewCardTitleStyled>
            <h3>Создание задачи</h3>
          </NewCardTitleStyled>
          <NewCardWrapStyled>
            <NewCardFormStyled onSubmit={handleCreate}>
              <div className="form-new__block">
                <label htmlFor="formTitle" className="subttl">
                  Название задачи
                </label>
                <NewCardInputStyled
                  type="text"
                  name="name"
                  id="formTitle"
                  placeholder="Введите название задачи..."
                  autoFocus
                  value={title}
                  onChange={handleTitleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-new__block">
                <label htmlFor="textArea" className="subttl">
                  Описание задачи
                </label>
                <NewCardAreaStyled
                  name="text"
                  id="textArea"
                  placeholder="Введите описание задачи..."
                  value={description}
                  onChange={handleDescriptionChange}
                  disabled={isSubmitting}
                />
              </div>
              {error && <p className="form-new__error">{error}</p>}
            </NewCardFormStyled>
            <Calendar />
          </NewCardWrapStyled>
          <NewCardCategoriesStyled>
            <p className="categories__p subttl">Категория</p>
            <div className="categories__themes">
              {topics.map((item) => (
                <NewCardThemeStyled
                  key={item}
                  className={`${topicMap[item] || "_gray"} ${
                    topic === item ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicSelect(item)}
                >
                  <p className={topicMap[item] || "_gray"}>{item}</p>
                </NewCardThemeStyled>
              ))}
            </div>
          </NewCardCategoriesStyled>
          <NewCardCreateButtonStyled
            type="button"
            onClick={handleCreate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Создаем..." : "Создать задачу"}
          </NewCardCreateButtonStyled>
        </NewCardBlockStyled>
      </ContainerStyled>
    </NewCardPageStyled>
  );
}

export default NewCardPage;
