import { createGlobalStyle } from "styled-components";
import { Palette } from "./palette";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  body {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: ${Palette.black};
    background-color: ${Palette.lightGray};
    -webkit-font-smoothing: antialiased;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  input,
  textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  ul li {
    list-style: none;
  }

  .subttl {
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0;
    color: ${Palette.black};
  }

  ._orange {
    background-color: ${Palette.orangeBg};
    color: ${Palette.orange};
  }

  ._green {
    background-color: ${Palette.greenBg};
    color: ${Palette.green};
  }

  ._purple {
    background-color: ${Palette.purpleBg};
    color: ${Palette.purple};
  }

  ._gray {
    background-color: ${Palette.gray};
    color: ${Palette.white};
  }
`;
