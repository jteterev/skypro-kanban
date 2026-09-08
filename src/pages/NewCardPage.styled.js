import styled from "styled-components";

const Palette = {
  primary: "#565eef",
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
  border: "#d4dbe5",
  red: "#e4391c",
};

export const NewCardPageStyled = styled.main`
  width: 100%;
  background-color: ${Palette.lightGray};
  min-height: calc(100vh - 70px);
`;

export const ContainerStyled = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
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
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  text-align: left;
`;

export const NewCardTitleStyled = styled.div`
  h3 {
    color: ${Palette.black};
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 20px;
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
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
  min-height: 300px;

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

  .form-new__error {
    color: ${Palette.red};
    font-size: 13px;
    line-height: 20px;
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
  background: #f9f9f9;
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
  background: #f9f9f9;
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

  &:hover {
    background-color: #33399b;
  }
`;
