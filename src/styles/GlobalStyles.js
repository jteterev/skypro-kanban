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
