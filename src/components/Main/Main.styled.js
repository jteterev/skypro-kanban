import styled from "styled-components";
import { Palette } from "../../styles/palette";

export const MainStyled = styled.main`
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: ${Palette.lightGray};

  .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }

  @media screen and (max-width: 660px) {
    .container {
      padding: 0 16px;
    }
  }
`;

export const MainBlockStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    padding: 40px 0 64px;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 0 30px;
  }
`;

export const MainContentStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const ErrorStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 300px;
  padding: 20px;

  p {
    max-width: 420px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${Palette.red};
    text-align: center;
  }
`;

export const ErrorButtonStyled = styled.button`
  height: 40px;
  padding: 0 24px;
  background-color: ${Palette.primary};
  color: ${Palette.white};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }
`;

export const EmptyStateStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 320px;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyTitleStyled = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: ${Palette.black};
`;

export const EmptyTextStyled = styled.p`
  max-width: 360px;
  font-size: 14px;
  line-height: 1.5;
  color: ${Palette.gray};
`;

export const EmptyButtonStyled = styled.button`
  height: 40px;
  margin-top: 8px;
  padding: 0 24px;
  background-color: ${Palette.primary};
  color: ${Palette.white};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }
`;

export const EmptyIconStyled = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${Palette.white};

  svg {
    width: 48px;
    height: 48px;
  }
`;
