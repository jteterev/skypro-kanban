import styled from "styled-components";

export const Palette = {
  primary: "#565eef",
  primaryHover: "#33399b",
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
  border: "#d4dbe5",
  shadow: "0px 10px 39px 0px rgba(26, 56, 101, 0.21)",
  borderGray: "rgba(148, 166, 190, 0.4)",
};

export const HeaderStyled = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${Palette.white};
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
`;

export const HeaderLogoStyled = styled.div`
  img {
    width: 85px;
  }
`;

export const HeaderNavStyled = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  outline: none;

  a {
    color: ${Palette.white};
  }

  &:hover {
    background-color: ${Palette.primaryHover};
  }
`;

export const HeaderUserStyled = styled.span`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
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
