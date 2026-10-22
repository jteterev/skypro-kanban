import { Link } from "react-router-dom";
import { topicMap } from "../../data";
import { formatDate } from "../../utils/formatDate";
import { Palette } from "../../styles/palette";
import {
  CardsItemStyled,
  CardsCardStyled,
  CardGroupStyled,
  CardThemeStyled,
  CardBtnStyled,
  CardTitleStyled,
  CardContentStyled,
  CardDateStyled,
} from "./Card.styled";

function Card({ card }) {
  const cardId = card.id ?? card._id;
  const topic = card.topic || "Без категории";

  return (
    <CardsItemStyled>
      <CardsCardStyled>
        <CardGroupStyled>
          <CardThemeStyled className={topicMap[card.topic] || "_gray"}>
            <p>{topic}</p>
          </CardThemeStyled>
          <CardBtnStyled
            as={Link}
            to={`/card/${cardId}`}
            aria-label={`Открыть задачу «${card.title}»`}
          >
            <div></div>
            <div></div>
            <div></div>
          </CardBtnStyled>
        </CardGroupStyled>
        <CardContentStyled>
          <Link to={`/card/${cardId}`}>
            <CardTitleStyled>{card.title}</CardTitleStyled>
          </Link>
          <CardDateStyled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <g clipPath="url(#clip0_1_415)">
                <path
                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                  stroke={Palette.gray}
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                  stroke={Palette.gray}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_415">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{formatDate(card.date)}</p>
          </CardDateStyled>
        </CardContentStyled>
      </CardsCardStyled>
    </CardsItemStyled>
  );
}

export default Card;
