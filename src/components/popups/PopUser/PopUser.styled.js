import styled from "styled-components";

export const Palette = {
  primary: "#565eef",
  primaryHover: "#33399b",
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
  shadow: "0px 10px 39px 0px rgba(26, 56, 101, 0.21)",
  borderGray: "rgba(148, 166, 190, 0.4)",
};

export const PopUserSetStyled = styled.div`
  display: none;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid ${Palette.borderGray};
  background: ${Palette.white};
  box-shadow: ${Palette.shadow};
  padding: 34px;
  text-align: center;
  z-index: 2;

  &.show {
    display: block;
  }
`;

export const PopUserSetNameStyled = styled.p`
  color: ${Palette.black};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const PopUserSetMailStyled = styled.p`
  color: ${Palette.gray};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const PopUserSetThemeStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: ${Palette.black};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: ${Palette.lightGray};
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background-color: ${Palette.gray};
      transition: 0.5s;
    }

    &:checked::before {
      left: 12px;
    }
  }
`;

export const PopUserSetButtonStyled = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: ${Palette.primary};
  border-radius: 4px;
  border: 1px solid ${Palette.primary};
  cursor: pointer;
  outline: none;

  a {
    color: ${Palette.primary};
  }

  &:hover {
    background-color: ${Palette.primaryHover};
    color: ${Palette.white};

    a {
      color: ${Palette.white};
    }
  }
`;
