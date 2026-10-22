import styled from "styled-components";
import { Palette } from "../../styles/palette";

export const ColumnStyles = styled.div`
  flex: 1 1 20%;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const ColumnTitleStyled = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: ${Palette.gray};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    overflow-x: auto;
  }
`;
