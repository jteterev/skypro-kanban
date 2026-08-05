import { PopBrowseStyles } from "../../../styles/PopupStyles";
import Calendar from "../../Calendar/Calendar";

function PopBrowse({ isOpen, onClose }) {
  return (
    <PopBrowseStyles id="popBrowse" isOpen={isOpen}>
      <div className="pop-browse__container" onClick={onClose}>
        <div className="pop-browse__block" onClick={(e) => e.stopPropagation()}>
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">Название задачи</h3>
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">Web Design</p>
              </div>
            </div>
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__theme _gray">
                <p>Нужно сделать</p>
              </div>
            </div>
            <div className="pop-browse__wrap">
              <div className="pop-browse__form form-browse">
                <div className="form-browse__block">
                  <p className="subttl">Описание задачи</p>
                  <div className="form-browse__area">
                    <p className="form-browse__placeholder">Описание задачи</p>
                  </div>
                </div>
              </div>
              <Calendar />
            </div>
            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03">
                  Редактировать задачу
                </button>
                <button className="btn-browse__delete _btn-bor _hover03">
                  Удалить задачу
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
            <div className="pop-browse__btn-edit _hide">
              <div className="btn-group">
                <button className="btn-edit__edit _btn-bg _hover01">
                  Сохранить
                </button>
                <button className="btn-edit__edit _btn-bor _hover03">
                  Отменить
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  id="btnDelete"
                >
                  Удалить задачу
                </button>
              </div>
              <button
                className="btn-edit__close _btn-bg _hover01"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </PopBrowseStyles>
  );
}

export default PopBrowse;
