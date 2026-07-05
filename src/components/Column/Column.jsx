import { ColumnStyles, ColumnTitleStyled, CardsStyled } from "./Column.styled";

function Column({ title, children }) {
  return (
    <ColumnStyles>
      <ColumnTitleStyled>
        <p>{title}</p>
      </ColumnTitleStyled>
      <CardsStyled>{children}</CardsStyled>
    </ColumnStyles>
  );
}

export default Column;
