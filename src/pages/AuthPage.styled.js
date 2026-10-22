import styled from "styled-components";
import { Link } from "react-router-dom";
import { Palette } from "../styles/palette";

export const AuthContainerStyled = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  background-color: ${Palette.lightGray};
`;

export const AuthBlockStyled = styled.div`
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

export const AuthTitleStyled = styled.div`
  text-align: center;
  margin-bottom: 28px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    color: ${Palette.black};
  }
`;

export const AuthFormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  .auth__error {
    margin-top: 4px;
    color: ${Palette.red};
    font-size: 13px;
    line-height: 20px;
    text-align: center;
  }
`;

export const AuthInputStyled = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  padding: 10px 14px;
  border: 0.7px solid ${Palette.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${Palette.black};
  background: ${Palette.inputBg};
  outline: none;
  transition:
    border-color 0.2s,
    background-color 0.2s;

  &:focus {
    border-color: ${Palette.primary};
    background: ${Palette.white};
  }

  &::placeholder {
    color: ${Palette.gray};
  }

  &:disabled {
    opacity: 0.7;
  }
`;

export const AuthActionsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

export const AuthFormGroupStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  p {
    font-size: 14px;
    line-height: 1.5;
    color: ${Palette.gray};
    text-align: center;
  }
`;

export const AuthButtonStyled = styled.button`
  width: 100%;
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

  &:not(:disabled):hover {
    background-color: ${Palette.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AuthLinkStyled = styled(Link)`
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  color: ${Palette.primary};
  text-decoration: underline;

  &:hover {
    color: ${Palette.primaryHover};
  }
`;
