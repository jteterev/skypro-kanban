import { Link } from "react-router-dom";
import styled from "styled-components";

const Palette = {
  primary: "#6366f1",
  primaryHover: "#4f46e5",
  gray: "#94a6be",
  lightGray: "#f1f5f9",
  white: "#ffffff",
  black: "#0f172a",
  border: "#e2e8f0",
  red: "#ef4444",
};

export const AuthContainerStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
`;

export const AuthModalStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthBlockStyled = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${Palette.white};
  max-width: 420px;
  width: 100%;
  padding: 48px 40px 40px;
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 495px) {
    padding: 36px 24px 32px;
    border-radius: 20px;
  }
`;

export const AuthTitleStyled = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: ${Palette.black};
    letter-spacing: -0.5px;
  }
`;

export const AuthFormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .auth__error {
    color: ${Palette.red};
    font-size: 13px;
    line-height: 20px;
    margin: 8px 0 0;
    text-align: center;
  }
`;

export const AuthInputStyled = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${Palette.border};
  border-radius: 12px;
  font-size: 15px;
  color: ${Palette.black};
  background: ${Palette.white};
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 16px;

  &:focus {
    border-color: ${Palette.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  &::placeholder {
    color: ${Palette.gray};
  }
`;

export const AuthActionsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`;

export const AuthFormGroupStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 14px;
    color: ${Palette.gray};
    text-align: center;
    line-height: 150%;
    letter-spacing: -0.01em;
  }

  .auth-register-text {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: -0.01em;
    text-align: center;
    color: #94a6be66;
    margin-bottom: 4px;
  }
`;

export const AuthButtonStyled = styled.button`
  width: 100%;
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
`;

export const AuthLinkStyled = styled(Link)`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.01em;
  text-align: center;
  display: block;
  color: #6366f1;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #4f46e5;
  }
`;
