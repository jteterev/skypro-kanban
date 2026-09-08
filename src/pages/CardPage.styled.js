import styled from "styled-components";

const Palette = {
  primary: "#565eef",
  primaryHover: "#33399b",
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
  border: "#d4dbe5",
};

export const CardPageStyled = styled.main`
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

export const CardBlockStyled = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${Palette.white};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid ${Palette.border};
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  text-align: left;
`;

export const CardIdStyled = styled.p`
  color: ${Palette.gray};
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.14px;
  margin-bottom: 12px;
`;

export const CardTopBlockStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

export const CardTitleStyled = styled.h3`
  color: ${Palette.black};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const CardTitleInputStyled = styled.input`
  flex: 1;
  height: 40px;
  padding: 10px 14px;
  border: 0.7px solid ${Palette.border};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${Palette.black};
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${Palette.primary};
    background: ${Palette.white};
  }
`;

export const CardThemeStyled = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  flex-shrink: 0;

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const CardStatusStyled = styled.div`
  margin-bottom: 11px;

  .status__p {
    margin-bottom: 14px;
  }

  .status__themes {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const CardStatusThemeStyled = styled.div`
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: ${Palette.gray};
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
  display: inline-block;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s;

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
  }

  &:hover {
    border-color: ${Palette.primary};
    color: ${Palette.primary};
  }

  &._active-status {
    background-color: ${Palette.gray};
    border-color: ${Palette.gray};
    color: ${Palette.white};

    p {
      color: ${Palette.white};
    }
  }
`;

export const CardWrapStyled = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  .subttl {
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    letter-spacing: 0px;
    margin-bottom: 14px;
  }

  @media screen and (max-width: 660px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const CardFormStyled = styled.div`
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .form-browse__block {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const CardAreaViewStyled = styled.div`
  background-color: #eef1f8;
  border-radius: 8px;
  flex: 1;
  padding: 16px;

  p {
    color: ${Palette.black};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const CardAreaStyled = styled.textarea`
  width: 100%;
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

export const CardBtnBrowseStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  .btn-group {
    display: flex;
    gap: 8px;
  }
`;

export const CardBtnEditStyled = styled(CardBtnBrowseStyled)``;

export const CardButtonStyled = styled.button`
  background-color: transparent;
  border: 0.7px solid ${Palette.primary};
  color: ${Palette.primary};
  border-radius: 4px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
    color: ${Palette.white};
    border-color: ${Palette.primaryHover};
  }
`;

export const CardCloseButtonStyled = styled.button`
  background-color: ${Palette.primary};
  color: ${Palette.white};
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }
`;
