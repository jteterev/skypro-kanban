import { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";
import Calendar from "../components/Calendar/Calendar";
import { topics, defaultTopic, defaultStatus, topicMap } from "../data";
import {
  NewCardPageStyled,
  ContainerStyled,
  NewCardBlockStyled,
  NewCardHeaderStyled,
  NewCardTitleStyled,
  NewCardWrapStyled,
  NewCardFormStyled,
  NewCardFieldsStyled,
  NewCardInputStyled,
  NewCardAreaStyled,
  NewCardCategoriesStyled,
  NewCardThemeStyled,
  NewCardActionsStyled,
  NewCardCreateButtonStyled,
} from "./NewCardPage.styled";

function NewCardPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState(defaultTopic);
  const [date, setDate] = useState(() => new Date().toISOString());
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blockRef = useRef(null);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    navigate("/");
  }, [isSubmitting, navigate]);

  const handleOverlayClick = (event) => {
    // Клик по затемнённому фону закрывает форму
    if (event.target === event.currentTarget) {
      handleClose();
      return;
    }

    // Клик по пустому месту вокруг блока формы тоже закрывает её
    if (blockRef.current && !blockRef.current.contains(event.target)) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const nextErrors = {};

    if (!trimmedTitle) {
      nextErrors.title = "Введите название задачи";
    }

    if (!trimmedDescription) {
      nextErrors.description = "Введите описание задачи";
    }

    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await addTask(user.token, {
        title: trimmedTitle,
        topic,
        status: defaultStatus,
        description: trimmedDescription,
        date,
      });

      navigate("/");
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <NewCardPageStyled onClick={handleOverlayClick}>
      <ContainerStyled>
        <NewCardBlockStyled ref={blockRef}>
          <NewCardHeaderStyled>
            <NewCardTitleStyled>
              <h3>Создание задачи</h3>
            </NewCardTitleStyled>
          </NewCardHeaderStyled>
          <NewCardFormStyled onSubmit={handleSubmit} noValidate>
            <NewCardWrapStyled>
              <NewCardFieldsStyled>
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors((prev) => ({ ...prev, title: "" }));
                    }}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.title)}
                  />
                  {errors.title && (
                    <span className="form-new__field-error">
                      {errors.title}
                    </span>
                  )}
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
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors((prev) => ({ ...prev, description: "" }));
                    }}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.description)}
                  />
                  {errors.description && (
                    <span className="form-new__field-error">
                      {errors.description}
                    </span>
                  )}
                </div>
              </NewCardFieldsStyled>
              <Calendar value={date} onChange={setDate} />
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
                    onClick={() => setTopic(item)}
                    aria-pressed={topic === item}
                  >
                    <p>{item}</p>
                  </NewCardThemeStyled>
                ))}
              </div>
            </NewCardCategoriesStyled>

            {serverError && (
              <p className="form-new__error" role="alert">
                {serverError}
              </p>
            )}

            <NewCardActionsStyled>
              <NewCardCreateButtonStyled type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Создаем..." : "Создать задачу"}
              </NewCardCreateButtonStyled>
            </NewCardActionsStyled>
          </NewCardFormStyled>
        </NewCardBlockStyled>
      </ContainerStyled>
    </NewCardPageStyled>
  );
}

export default NewCardPage;
