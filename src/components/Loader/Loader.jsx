import {
  LoaderStyled,
  SpinnerStyled,
  RingStyled,
  DotStyled,
  LoaderTextStyled,
} from "./Loader.styled";

function Loader({ label = "Загрузка..." }) {
  return (
    <LoaderStyled role="status" aria-live="polite">
      <SpinnerStyled>
        <RingStyled />
        <RingStyled />
        <RingStyled />
        <DotStyled />
      </SpinnerStyled>
      <LoaderTextStyled>{label}</LoaderTextStyled>
    </LoaderStyled>
  );
}

export default Loader;
