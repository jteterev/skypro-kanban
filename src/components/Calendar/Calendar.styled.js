import styled from "styled-components";
import { Palette } from "../../styles/palette";

export const CalendarStyled = styled.div`
  width: 182px;
  margin-bottom: 20px;
  flex-shrink: 0;

  @media screen and (max-width: 660px) {
    width: 100%;
    max-width: 340px;
  }
`;

export const CalendarTtlStyled = styled.p`
  margin-bottom: 14px;
  padding: 0 7px;
`;

export const CalendarBlockStyled = styled.div`
  display: block;
`;

export const CalendarNavStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
`;

export const CalendarMonthStyled = styled.div`
  color: ${Palette.gray};
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const NavActionsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavActionStyled = styled.button`
  width: 18px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;

  svg {
    fill: ${Palette.gray};
    transition: fill 0.2s;
  }

  &:hover svg {
    fill: ${Palette.primary};
  }
`;

export const CalendarContentStyled = styled.div`
  margin-bottom: 12px;
`;

export const CalendarDaysNamesStyled = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const CalendarDayNameStyled = styled.div`
  color: ${Palette.gray};
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
`;

export const CalendarCellsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media screen and (max-width: 660px) {
    justify-content: space-around;
  }
`;

export const CalendarCellStyled = styled.button`
  width: 22px;
  height: 22px;
  margin: 2px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${Palette.gray};
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;

  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  &:not(:disabled):hover {
    background-color: ${Palette.lightGray};
  }

  &:disabled {
    cursor: default;
  }

  &._current {
    font-weight: 700;
    color: ${Palette.black};
  }

  &._active-day,
  &._active-day._current {
    background-color: ${Palette.gray};
    color: ${Palette.white};
  }
`;

export const CalendarEmptyCellStyled = styled.span`
  width: 22px;
  height: 22px;
  margin: 2px;

  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
  }
`;

export const CalendarPeriodStyled = styled.div`
  padding: 0 7px;
`;

export const CalendarPStyled = styled.p`
  color: ${Palette.gray};
  font-size: 10px;
  line-height: 1.3;

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }
`;
