import styled from "styled-components";

const Palette = {
  primary: "#6366f1",
  primaryHover: "#4f46e5",
  white: "#ffffff",
  black: "#0f172a",
  border: "#e2e8f0",
};

export const ExitPageStyled = styled.div`
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
`;

export const ExitContainerStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
`;

export const ExitBlockStyled = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${Palette.white};
  max-width: 420px;
  width: 100%;
  padding: 48px 40px 40px;
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 495px) {
    padding: 36px 24px 32px;
    border-radius: 20px;
  }
`;

export const ExitTitleStyled = styled.div`
  h2 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: ${Palette.black};
    letter-spacing: -0.5px;
    margin-bottom: 32px;
  }
`;

export const ExitFormStyled = styled.form`
  width: 100%;
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
  height: 48px;
  background-color: ${Palette.primary};
  border-radius: 12px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: ${Palette.white};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;

export const ExitNoButtonStyled = styled.button`
  width: 153px;
  height: 48px;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${Palette.primary};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: ${Palette.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${Palette.primary};
    color: ${Palette.white};
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;
