import { Link } from "react-router-dom";
import styled from "styled-components";

const Palette = {
  primary: "#6366f1",
  primaryHover: "#4f46e5",
  gray: "#94a6be",
  lightGray: "#f8fafc",
  white: "#ffffff",
};

export const NotFoundPageStyled = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: ${Palette.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
`;

export const NotFoundContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${Palette.white};
  padding: 60px 40px;
  border-radius: 24px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
  max-width: 480px;
  width: 100%;
`;

export const NotFoundCodeStyled = styled.h1`
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  color: ${Palette.primary};

  @media screen and (max-width: 495px) {
    font-size: 80px;
  }
`;

export const NotFoundTextStyled = styled.p`
  max-width: 320px;
  margin: 24px 0 32px;
  font-size: 16px;
  line-height: 1.6;
  color: ${Palette.gray};
`;

export const NotFoundLinkStyled = styled(Link)`
  height: 48px;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${Palette.primary};
  color: ${Palette.white};
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;
