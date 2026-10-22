import styled from "styled-components";
import { Palette } from "../../styles/palette";

export const HeaderStyled = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${Palette.white};

  .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }
`;

export const HeaderBlockStyled = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;

  @media screen and (max-width: 660px) {
    height: auto;
    padding: 10px 0;
    flex-direction: column;
  }
`;

export const HeaderLogoStyled = styled.div`
  img {
    display: block;
    width: 120px;
    height: auto;
  }
`;

export const HeaderNavStyled = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 660px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const HeaderBtnNewStyled = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${Palette.primary};
  color: ${Palette.white};
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${Palette.primaryHover};
  }

  @media screen and (max-width: 660px) {
    width: 100%;
    margin: 10px 0;
  }
`;

export const HeaderUserStyled = styled.button`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 14px;
  line-height: 20px;
  color: ${Palette.primary};
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${Palette.primary};
    border-bottom: 1.9px solid ${Palette.primary};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover {
    color: ${Palette.primaryHover};

    &::after {
      border-left-color: ${Palette.primaryHover};
      border-bottom-color: ${Palette.primaryHover};
    }
  }
`;
