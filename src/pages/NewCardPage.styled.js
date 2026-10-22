import styled from "styled-components";
import { Palette } from "../styles/palette";

export const NewCardPageStyled = styled.main`
  // Вложенная страница — модальный оверлей поверх доски
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${Palette.overlay};
`;

export const ContainerStyled = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: auto;
  padding: 25px 30px 49px;
`;

export const NewCardBlockStyled = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${Palette.white};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid ${Palette.border};
  box-shadow: ${Palette.cardShadow};
  text-align: left;

  @media screen and (max-width: 495px) {
    padding: 24px 16px 28px;
  }
`;

export const NewCardHeaderStyled = styled.div`
  margin-bottom: 20px;
`;

export const NewCardTitleStyled = styled.div`
  h3 {
    color: ${Palette.black};
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 0;
  }
`;

export const NewCardWrapStyled = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const NewCardFormStyled = styled.form`
  display: block;
  width: 100%;

  .form-new__error {
    display: block;
    margin-bottom: 16px;
    color: ${Palette.red};
    font-size: 13px;
    line-height: 20px;
  }

  .form-new__field-error {
    margin-top: 6px;
    color: ${Palette.red};
    font-size: 12px;
    line-height: 16px;
  }
`;

export const NewCardFieldsStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
  margin-right: 20px;

  .form-new__block {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    &:first-child {
      flex: 0 0 auto;
    }

    &:last-child {
      flex: 1;
    }
  }

  @media screen and (max-width: 660px) {
    margin-right: 0;
  }
`;

export const NewCardInputStyled = styled.input`
  width: 100%;
  max-width: 370px;
  height: 40px;
  padding: 10px 14px;
  border: 0.7px solid ${Palette.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${Palette.black};
  background: ${Palette.inputBg};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${Palette.primary};
    background: ${Palette.white};
  }

  &::placeholder {
    color: ${Palette.gray};
  }
`;

export const NewCardAreaStyled = styled.textarea`
  width: 100%;
  max-width: 370px;
  min-height: 100px;
  padding: 10px 14px;
  border: 0.7px solid ${Palette.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${Palette.black};
  background: ${Palette.inputBg};
  outline: none;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s;
  flex: 1;

  &:focus {
    border-color: ${Palette.primary};
    background: ${Palette.white};
  }

  &::placeholder {
    color: ${Palette.gray};
  }
`;

export const NewCardCategoriesStyled = styled.div`
  margin-bottom: 20px;

  .categories__p {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: ${Palette.black};
  }

  .categories__themes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const NewCardThemeStyled = styled.div`
  border-radius: 24px;
  padding: 8px 18px;
  cursor: pointer;
  transition: opacity 0.2s;
  display: inline-block;
  opacity: 0.4;

  &:hover {
    opacity: 0.8;
  }

  &._active-category {
    opacity: 1;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
  }
`;

export const NewCardActionsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const NewCardCreateButtonStyled = styled.button`
  display: block;
  width: 152px;
  height: 30px;
  background-color: ${Palette.primary};
  color: ${Palette.white};
  border: none;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: auto;

  &:not(:disabled):hover {
    background-color: ${Palette.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
