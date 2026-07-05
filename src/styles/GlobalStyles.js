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

  /* Layout */
  .wrapper {
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
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
  .pop-exit:target,
  .pop-new-card:target,
  .pop-browse:target {
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

  /* Media */
  @media screen and (max-width: 1200px) {
    .main__block {
      width: 100%;
      margin: 0 auto;
      padding: 40px 0 64px;
    }

    .main__content {
      display: block;
    }

    .main__column {
      width: 100%;
      margin: 0 auto;
      display: block;
    }

    .cards {
      width: 100%;
      display: flex;
      overflow-y: auto;
    }

    .cards__card {
      width: 220px;
      height: 130px;
      background-color: #ffffff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: stretch;
      padding: 15px 13px 19px;
    }
  }

  @media screen and (max-width: 660px) {
    .pop-new-card {
      top: 70px;
    }

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

    .calendar__cell p {
      font-size: 14px;
    }

    .header__block {
      height: auto;
      padding: 10px 0;
      flex-direction: column;
    }

    .header__nav {
      flex-direction: column;
      width: 100%;
    }

    .header__btn-main-new {
      width: 100%;
      margin: 10px 0;
    }
  }
`;
