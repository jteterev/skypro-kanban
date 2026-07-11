import styled from "styled-components";

export const Palette = {
  gray: "#94a6be",
  lightGray: "#eaeef6",
  white: "#ffffff",
  black: "#000000",
};

export const MainStyled = styled.main`
  width: 100%;
  background-color: ${Palette.lightGray};

  .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }
`;

export const MainBlockStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 0 30px;
  }
`;

export const MainContentStyled = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const MainColumnStyled = styled.div`
  width: 20%;
  margin: 0 10px;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
`;

export const LoadingStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-size: 18px;
  font-weight: 500;
  color: ${Palette.gray};
  letter-spacing: -0.14px;
`;
