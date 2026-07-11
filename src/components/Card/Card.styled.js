import styled, { keyframes } from "styled-components";

const cardAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: auto;
    opacity: 1;
  }
`;

export const Palette = {
  primary: "#565eef",
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
  orange: "#ff6d00",
  orangeBg: "#ffe4c2",
  green: "#06b16e",
  greenBg: "#b4fdd1",
  purple: "#9a48f1",
  purpleBg: "#e9d4ff",
  grayTheme: "#94a6be",
  grayThemeBg: "#94a6be",
};

export const CategoryColors = {
  _orange: { bg: Palette.orangeBg, color: Palette.orange },
  _green: { bg: Palette.greenBg, color: Palette.green },
  _purple: { bg: Palette.purpleBg, color: Palette.purple },
  _gray: { bg: Palette.grayThemeBg, color: Palette.white },
};

export const CardsItemStyled = styled.div`
  padding: 5px;
  animation-name: ${cardAnimation};
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

export const CardsCardStyled = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${Palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
  }
`;

export const CardGroupStyled = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardThemeStyled = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const CardBtnStyled = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${Palette.gray};
  }
`;

export const CardTitleStyled = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${Palette.black};
  margin-bottom: 10px;
`;

export const CardContentStyled = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardDateStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${Palette.gray};
    letter-spacing: 0.2px;
  }
`;
