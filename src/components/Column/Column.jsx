import { ColumnTitleStyled, CardsStyled } from "./Column.styled";

function Column({ title, children }) {
  return (
    <div className="main__column">
      <ColumnTitleStyled>
        <p>{title}</p>
      </ColumnTitleStyled>
      <CardsStyled>{children}</CardsStyled>
    </div>
  );
}

export default Column;
