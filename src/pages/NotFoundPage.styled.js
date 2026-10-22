import styled from "styled-components";
import { Link } from "react-router-dom";
import { Palette } from "../styles/palette";

export const NotFoundCodeStyled = styled.p`
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: ${Palette.primary};

  @media screen and (max-width: 495px) {
    font-size: 72px;
  }
`;

export const NotFoundTextStyled = styled.p`
  max-width: 320px;
  margin: 16px auto 28px;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  color: ${Palette.gray};
`;

export const NotFoundLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${Palette.primary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${Palette.white};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Palette.primaryHover};
  }
`;
