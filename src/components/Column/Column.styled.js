import styled from "styled-components";

export const ColumnStyles = styled.div`
  width: 20%;
  margin: 0 10px;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
`;

export const ColumnTitleStyled = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: ${({ theme }) => theme.gray};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsStyled = styled.div`
  width: 100%;
  display: block;
  position: relative;

  .cards__item {
    padding: 5px;
    animation-name: card-animation;
    animation-duration: 500ms;
    animation-timing-function: linear;
  }

  .cards__card {
    width: 220px;
    height: 130px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
  }

  @media screen and (max-width: 1200px) {
    display: flex;
    overflow-y: auto;

    .cards__card {
      width: 220px;
      height: 130px;
      background-color: #ffffff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: stretch;
      padding: 15px 13px 19px;
    }
  }
`;
