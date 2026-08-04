import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  /* Animation */
  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }

  /* Body */
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: #000000;
  }

  /* Hover effects */
  ._hover01:hover {
    background-color: #33399b;
  }

  ._hover02:hover,
  .header__user:hover {
    color: #33399b;
  }

  ._hover02:hover::after,
  .header__user:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }

  ._hover03:hover {
    background-color: #33399b;
    color: #ffffff;
  }

  ._hover03:hover a {
    color: #ffffff;
  }

  /* Popup target display */
  .pop-user-set:target,
  .pop-exit:target {
    display: block;
  }

  /* Color classes */
  ._orange {
    background-color: #ffe4c2;
    color: #ff6d00;
  }

  ._green {
    background-color: #b4fdd1;
    color: #06b16e;
  }

  ._purple {
    background-color: #e9d4ff;
    color: #9a48f1;
  }

  ._gray {
    background: #94a6be;
    color: #ffffff;
  }

  ._active-category {
    opacity: 1 !important;
  }

  /* Popup base */
  .pop-wrap {
    position: relative;
    top: 0;
    left: 0;
  }

  /* Hide classes */
  ._hide {
    display: none;
  }

  ._dark {
    display: none;
  }

  /* Status */
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

  /* Form new card */
  .form-new {
    &__block {
      margin-bottom: 20px;
    }

    &__input {
      width: 100%;
      max-width: 370px;
      height: 40px;
      padding: 10px 14px;
      border: 0.7px solid #d4dbe5;
      border-radius: 8px;
      font-size: 14px;
      color: #000;
      background: #f9f9f9;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #565eef;
        background: #fff;
      }

      &::placeholder {
        color: #94a6be;
      }
    }

    &__area {
      width: 100%;
      max-width: 370px;
      min-height: 100px;
      padding: 10px 14px;
      border: 0.7px solid #d4dbe5;
      border-radius: 8px;
      font-size: 14px;
      color: #000;
      background: #f9f9f9;
      outline: none;
      resize: vertical;
      font-family: inherit;
      transition: border-color 0.2s;

      &:focus {
        border-color: #565eef;
        background: #fff;
      }

      &::placeholder {
        color: #94a6be;
      }
    }
  }

  /* Categories */
  .categories {
    margin-bottom: 20px;

    &__p {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #000;
    }

    &__themes {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    &__theme {
      border-radius: 24px;
      padding: 8px 18px;
      cursor: pointer;
      transition: opacity 0.2s;
      display: inline-block;

      &:hover {
        opacity: 0.8;
      }

      p {
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
      }
    }
  }

  /* Button styles */
  ._btn-bg {
    background-color: #565eef;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    line-height: 30px;
    height: 30px;
    cursor: pointer;
    transition: background-color 0.2s;

    a {
      color: #ffffff;
    }
  }

  ._btn-bor {
    background-color: transparent;
    border: 0.7px solid #565eef;
    color: #565eef;
    border-radius: 4px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    line-height: 30px;
    height: 30px;
    cursor: pointer;
  }

  .form-new {
    &__create {
      display: block;
      width: 100%;
      max-width: 630px;
      margin: 0 auto;
      height: 36px;
      background-color: #565eef;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      line-height: 36px;
      text-align: center;
    }
  }

  /* Media */
  @media screen and (max-width: 660px) {
    .calendar {
      max-width: 340px;
      width: 100%;
    }

    .calendar__ttl,
    .calendar__nav,
    .calendar__period {
      padding: 0;
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
