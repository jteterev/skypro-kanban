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
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;

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
`;

export const PopBrowseStyles = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;

  .pop-browse__close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #94a6be;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: #000000;
    }
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
        display: inline-block;
        flex-shrink: 0;

        p {
          font-size: 14px;
          line-height: 1;
          letter-spacing: -0.14px;
        }
      }
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

    .pop-new-card__calendar.calendar {
      width: 182px;
      margin-bottom: 20px;

      .calendar__ttl {
        margin-bottom: 14px;
        padding: 0 7px;
      }

      .calendar__block {
        display: block;
      }

      .calendar__month {
        color: #94a6be;
        font-size: 14px;
        line-height: 25px;
        font-weight: 600;
      }

      .calendar__content {
        margin-bottom: 12px;
      }

      .calendar__days-names {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        margin: 7px 0;
        padding: 0 7px;
      }

      .calendar__day-name {
        color: #94a6be;
        font-size: 10px;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.2px;
      }

      .calendar__cells {
        width: 182px;
        height: 126px;
        display: flex;
        flex-wrap: wrap;
      }

      .calendar__cell {
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

        &:hover {
          color: #94a6be;
          background-color: #eaeef6;
        }

        &._other-month {
          opacity: 0;
        }

        &._active-day {
          background-color: #94a6be;
          color: #ffffff;
        }

        &._current {
          font-weight: 700;
        }
      }

      .calendar__nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 14px;
        padding: 0 7px;
      }

      .calendar__period {
        padding: 0 7px;
      }

      .calendar__p {
        color: #94a6be;
        font-size: 10px;
        line-height: 1;

        span {
          color: #000000;
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
    }
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

  .pop-browse__btn-edit._hide {
    display: none;
  }
`;
