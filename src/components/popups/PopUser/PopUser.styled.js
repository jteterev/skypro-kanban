import styled from "styled-components";
import { Link } from "react-router-dom";
import { Palette } from "../../../styles/palette";

export const PopUserSetStyled = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  border-radius: 10px;
  border: 0.7px solid ${Palette.borderGray};
  background: ${Palette.white};
  box-shadow: ${Palette.shadow};
  padding: 28px 34px 30px;
  text-align: center;
  z-index: 2;
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
  margin-bottom: 24px;
  overflow-wrap: anywhere;
`;

export const PopUserSetButtonStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 30px;
  background: transparent;
  color: ${Palette.primary};
  border-radius: 4px;
  border: 1px solid ${Palette.primary};
  transition: all 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
    color: ${Palette.white};
  }
`;
