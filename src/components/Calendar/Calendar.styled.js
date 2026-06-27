import styled from "styled-components";

export const Palette = {
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
};

export const CalendarStyled = styled.div`
  width: 182px;
  margin-bottom: 20px;
`;

export const CalendarTtlStyled = styled.p`
  margin-bottom: 14px;
  padding: 0 7px;
`;

export const CalendarBlockStyled = styled.div`
  display: block;
`;

export const CalendarMonthStyled = styled.div`
  color: ${Palette.gray};
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

export const CalendarNavStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
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
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 660px) {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export const CalendarCellStyled = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: ${Palette.gray};
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;

  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  &:hover {
    color: ${Palette.gray};
    background-color: ${Palette.lightGray};
  }

  &._other-month {
    opacity: 0;
  }

  &._active-day {
    background-color: ${Palette.gray};
    color: ${Palette.white};
  }

  &._current {
    font-weight: 700;
  }
`;

export const CalendarPeriodStyled = styled.div`
  padding: 0 7px;
`;

export const CalendarPStyled = styled.p`
  color: ${Palette.gray};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${Palette.black};
  }

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }
`;

export const NavActionsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavActionStyled = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${Palette.gray};
  }
`;

export const CalendarTtl = styled.p`
  margin-bottom: 14px;
  padding: 0 7px;
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarMonth = styled.div`
  color: ${Palette.gray};
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
`;

export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const CalendarDayName = styled.div`
  color: ${Palette.gray};
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
`;

export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 660px) {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: ${Palette.gray};
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;

  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  &:hover {
    color: ${Palette.gray};
    background-color: ${Palette.lightGray};
  }

  &._other-month {
    opacity: 0;
  }

  &._active-day {
    background-color: ${Palette.gray};
    color: ${Palette.white};
  }

  &._current {
    font-weight: 700;
  }
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;
`;

export const CalendarP = styled.p`
  color: ${Palette.gray};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${Palette.black};
  }

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${Palette.gray};
  }
`;
