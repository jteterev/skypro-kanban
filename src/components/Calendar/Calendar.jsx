import { useState } from "react";
import {
  CalendarStyled,
  CalendarTtlStyled,
  CalendarBlockStyled,
  CalendarMonthStyled,
  CalendarNavStyled,
  CalendarContentStyled,
  CalendarDaysNamesStyled,
  CalendarDayNameStyled,
  CalendarCellsStyled,
  CalendarCellStyled,
  CalendarEmptyCellStyled,
  CalendarPeriodStyled,
  CalendarPStyled,
  NavActionsStyled,
  NavActionStyled,
} from "./Calendar.styled";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const daysNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const isSameDay = (first, second) =>
  Boolean(first) &&
  Boolean(second) &&
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

function Calendar({ value, onChange }) {
  const selectedDate = parseDate(value);
  const [viewDate, setViewDate] = useState(() => {
    const base = selectedDate || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const changeMonth = (delta) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  const handleSelect = (day) => {
    if (!onChange) return;
    onChange(new Date(year, month, day, 12).toISOString());
  };

  return (
    <CalendarStyled>
      <CalendarTtlStyled className="subttl">Даты</CalendarTtlStyled>
      <CalendarBlockStyled>
        <CalendarNavStyled>
          <CalendarMonthStyled>
            {months[month]} {year}
          </CalendarMonthStyled>
          <NavActionsStyled>
            <NavActionStyled
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Предыдущий месяц"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavActionStyled>
            <NavActionStyled
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Следующий месяц"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </NavActionStyled>
          </NavActionsStyled>
        </CalendarNavStyled>
        <CalendarContentStyled>
          <CalendarDaysNamesStyled>
            {daysNames.map((day) => (
              <CalendarDayNameStyled key={day}>{day}</CalendarDayNameStyled>
            ))}
          </CalendarDaysNamesStyled>
          <CalendarCellsStyled>
            {Array.from({ length: firstDayIndex }, (_, index) => (
              <CalendarEmptyCellStyled key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const date = new Date(year, month, day);
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, today);

              return (
                <CalendarCellStyled
                  key={day}
                  type="button"
                  className={[
                    isToday ? "_current" : "",
                    isSelected ? "_active-day" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={!onChange}
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(day)}
                >
                  {day}
                </CalendarCellStyled>
              );
            })}
          </CalendarCellsStyled>
        </CalendarContentStyled>
        {onChange && (
          <CalendarPeriodStyled>
            <CalendarPStyled>Выберите срок исполнения</CalendarPStyled>
          </CalendarPeriodStyled>
        )}
      </CalendarBlockStyled>
    </CalendarStyled>
  );
}

export default Calendar;
