import styled from "styled-components";

export const PopExitStyles = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  &:target {
    display: block;
  }

  .pop-exit__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
  }

  .pop-exit__block {
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 370px;
    width: 100%;
    padding: 50px 60px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  }

  .pop-exit__ttl h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
  }

  .pop-exit__form-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pop-exit__exit-yes {
    width: 153px;
    height: 30px;
    background-color: #565eef;
    border-radius: 4px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: #ffffff;
    margin-right: 10px;

    a {
      width: 100%;
      height: 100%;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .pop-exit__exit-no {
    width: 153px;
    height: 30px;
    background-color: transparent;
    border-radius: 4px;
    border: 0.7px solid var(--palette-navy-60, #565eef);
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: #ffffff;

    a {
      width: 100%;
      height: 100%;
      color: #565eef;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const PopNewCardStyles = styled.div`
  display: none;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;

  &:target {
    display: block;
  }

  .pop-new-card__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
  }

  .pop-new-card__block {
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 630px;
    width: 100%;
    padding: 40px 30px 48px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    position: relative;
  }

  .pop-new-card__content {
    display: block;
    text-align: left;
  }

  .pop-new-card__ttl {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 20px;
  }

  .pop-new-card__close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #94a6be;
    cursor: pointer;

    &:hover {
      color: #000000;
    }
  }

  .pop-new-card__wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .pop-new-card__form {
    max-width: 370px;
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }

  .form-new__block {
    display: flex;
    flex-direction: column;
  }

  .form-new__input,
  .form-new__area {
    width: 100%;
    outline: none;
    padding: 14px;
    background: transparent;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 1px;
      color: #94a6be;
      letter-spacing: -0.14px;
    }
  }

  .form-new__input {
    margin: 20px 0;
  }

  .form-new__area {
    max-width: 370px;
    margin-top: 14px;
    height: 200px;
  }

  .form-new__create {
    width: 132px;
    height: 30px;
    background-color: #565eef;
    border-radius: 4px;
    border: 0;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: #ffffff;
    float: right;
  }

  .subttl {
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
  }

  .calendar {
    width: 182px;
    margin-bottom: 20px;

    &__ttl {
      margin-bottom: 14px;
      padding: 0 7px;
    }

    &__p {
      color: #94a6be;
      font-size: 10px;
      line-height: 1;

      span {
        color: #000000;
      }
    }

    &__block {
      display: block;
    }

    &__month {
      color: #94a6be;
      font-size: 14px;
      line-height: 25px;
      font-weight: 600;
    }

    &__content {
      margin-bottom: 12px;
    }

    &__days-names {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;
      margin: 7px 0;
      padding: 0 7px;
    }

    &__day-name {
      color: #94a6be;
      font-size: 10px;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.2px;
    }

    &__cells {
      width: 182px;
      height: 126px;
      display: flex;
      flex-wrap: wrap;
    }

    &__cell {
      width: 22px;
      height: 22px;
      margin: 2px;
      border-radius: 50%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      color: #94a6be;
      font-size: 10px;
      line-height: 1;
      letter-spacing: -0.2px;
      cursor: pointer;
    }

    &__nav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 14px;
      padding: 0 7px;
    }

    &__period {
      padding: 0 7px;
    }
  }

  .nav__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__action {
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: #94a6be;
    }
  }

  ._other-month {
    opacity: 0;
  }

  ._cell-day:hover {
    color: #94a6be;
    background-color: #eaeef6;
  }

  ._active-day {
    background-color: #94a6be;
    color: #ffffff;
  }

  ._current {
    font-weight: 700;
  }

  .categories {
    margin-bottom: 20px;

    &__themes {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
    }

    &__p {
      margin-bottom: 14px;
    }

    &__theme {
      display: inline-block;
      width: auto;
      height: 30px;
      padding: 8px 20px;
      border-radius: 24px;
      margin-right: 7px;
      opacity: 0.4;

      p {
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        white-space: nowrap;
      }
    }
  }

  @media screen and (max-width: 660px) {
    top: 70px;

    .pop-new-card__container {
      padding: 0;
      justify-content: flex-start;
    }

    .pop-new-card__block {
      border-radius: 0;
    }

    .pop-new-card__wrap {
      display: block;
    }

    .calendar {
      max-width: 340px;
      width: 100%;

      &__ttl,
      &__nav,
      &__period {
        padding: 0;
      }
    }

    .calendar .date-create {
      display: none;
      margin-bottom: 7px;
    }

    .calendar__p {
      font-size: 14px;
    }

    .calendar__day-name {
      font-size: 14px;
    }

    .calendar__cells {
      width: 344px;
      height: auto;
    }

    .calendar__cell {
      width: 26px;
      height: 26px;
    }
  }
`;

export const PopBrowseStyles = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;

  &:target {
    display: block;
  }

  .pop-browse__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
  }

  .pop-browse__block {
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 630px;
    width: 100%;
    padding: 40px 30px 38px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    position: relative;
  }

  .pop-browse__content {
    display: block;
    text-align: left;

    .categories__theme {
      opacity: 1;
    }

    .theme-down {
      display: none;
      margin-bottom: 20px;
    }

    .theme-top {
      display: block;
    }
  }

  .pop-browse__top-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .pop-browse__ttl {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }

  .pop-browse__wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .pop-browse__form {
    max-width: 370px;
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }

  .pop-browse__btn-browse,
  .pop-browse__btn-edit {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;

    button {
      height: 30px;
      margin-bottom: 10px;
      padding: 0 14px;

      &.btn-group button {
        margin-right: 8px;
      }
    }
  }

  .form-browse__block {
    display: flex;
    flex-direction: column;
  }

  .form-browse__area {
    max-width: 370px;
    width: 100%;
    outline: none;
    padding: 14px;
    background: #eaeef6;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    margin-top: 14px;
    height: 200px;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 1px;
      color: #94a6be;
      letter-spacing: -0.14px;
    }
  }

  .status {
    margin-bottom: 11px;

    &__p {
      margin-bottom: 14px;
    }

    &__themes {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
    }

    &__theme {
      border-radius: 24px;
      border: 0.7px solid rgba(148, 166, 190, 0.4);
      color: #94a6be;
      padding: 11px 14px 10px;
      margin-right: 7px;
      margin-bottom: 7px;

      p {
        font-size: 14px;
        line-height: 1;
        letter-spacing: -0.14px;
      }
    }
  }

  ._btn-bor {
    border-radius: 4px;
    border: 0.7px solid var(--palette-navy-60, #565eef);
    outline: none;
    background: transparent;
    color: #565eef;

    a {
      color: #565eef;
    }
  }

  ._btn-bg {
    border-radius: 4px;
    background: #565eef;
    border: none;
    outline: none;
    color: #ffffff;

    a {
      color: #ffffff;
    }
  }
`;
