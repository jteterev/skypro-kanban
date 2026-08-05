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
  CalendarPeriodStyled,
  CalendarPStyled,
  NavActionsStyled,
  NavActionStyled,
} from "./Calendar.styled";

function Calendar({ month = "Сентябрь 2023", activeDay = null }) {
  const daysNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  // Сентябрь 2023 начинается с пятницы (индекс 4)
  const firstDayIndex = 4; // 0 = пн, 4 = пт
  const daysInMonth = 30;
  const days = [];
  const weekendIndices = [];

  // Пустые ячейки перед первым днём месяца
  for (let i = 0; i < firstDayIndex; i++) {
    days.push("");
  }
  // Дни месяца
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Определяем индексы выходных (сб = 5, вс = 6 относительно недели)
  days.forEach((day, index) => {
    if (day === "") return;
    const dayOfWeek = index % 7;
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      weekendIndices.push(index);
    }
  });

  return (
    <CalendarStyled>
      <CalendarTtlStyled className="subttl">Даты</CalendarTtlStyled>
      <CalendarBlockStyled>
        <CalendarNavStyled>
          <CalendarMonthStyled>{month}</CalendarMonthStyled>
          <NavActionsStyled>
            <NavActionStyled data-action="prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavActionStyled>
            <NavActionStyled data-action="next">
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
            {daysNames.map((day, index) => (
              <CalendarDayNameStyled
                key={index}
                className={index >= 5 ? "-weekend-" : ""}
              >
                {day}
              </CalendarDayNameStyled>
            ))}
          </CalendarDaysNamesStyled>
          <CalendarCellsStyled>
            {days.map((day, index) => {
              let classes = "calendar__cell";
              if (day === "") {
                classes += " _other-month";
              } else if (weekendIndices.includes(index)) {
                classes += " _cell-day _weekend";
              } else if (day === 8) {
                classes += " _cell-day _current";
              } else if (activeDay && day === activeDay) {
                classes += " _cell-day _weekend _active-day";
              } else {
                classes += " _cell-day";
              }
              return (
                <CalendarCellStyled key={index} className={classes}>
                  {day}
                </CalendarCellStyled>
              );
            })}
          </CalendarCellsStyled>
        </CalendarContentStyled>
        <input type="hidden" id="datepick_value" value="08.09.2023" />
        <CalendarPeriodStyled>
          <CalendarPStyled className="calendar__p date-end">
            Выберите срок исполнения <span className="date-control"></span>.
          </CalendarPStyled>
        </CalendarPeriodStyled>
      </CalendarBlockStyled>
    </CalendarStyled>
  );
}

export default Calendar;
