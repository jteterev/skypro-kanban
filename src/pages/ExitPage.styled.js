import styled from "styled-components";
import { Palette } from "../styles/palette";

export const ExitPageStyled = styled.main`
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  overflow-y: auto;
  background: ${Palette.overlay};
`;

export const ExitBlockStyled = styled.div`
  background-color: ${Palette.white};
  max-width: 420px;
  width: 100%;
  padding: 40px 30px 36px;
  border-radius: 10px;
  border: 0.7px solid ${Palette.border};
  box-shadow: ${Palette.cardShadow};

  @media screen and (max-width: 495px) {
    padding: 28px 20px 26px;
  }
`;

export const ExitTitleStyled = styled.div`
  h2 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    color: ${Palette.black};
    margin-bottom: 28px;
  }
`;

export const ExitFormGroupStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 12px;

  @media screen and (max-width: 495px) {
    flex-direction: column;
  }
`;

export const ExitYesButtonStyled = styled.button`
  width: 153px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Palette.primary};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${Palette.white};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }

  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;

export const ExitNoButtonStyled = styled.button`
  width: 153px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${Palette.primary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${Palette.primary};
  transition: all 0.2s;

  &:hover {
    background-color: ${Palette.primary};
    color: ${Palette.white};
  }

  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;
