import styled, { keyframes } from "styled-components";
import { Palette } from "../../styles/palette";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fade = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const LoaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 300px;
  padding: 40px 20px;
`;

export const SpinnerStyled = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
`;

export const RingStyled = styled.span`
  position: absolute;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1.1s linear infinite;

  &:nth-child(1) {
    inset: 0;
    border-top-color: ${Palette.primary};
  }

  &:nth-child(2) {
    inset: 10px;
    border-right-color: ${Palette.gray};
    animation-duration: 1.5s;
    animation-direction: reverse;
  }

  &:nth-child(3) {
    inset: 20px;
    border-bottom-color: ${Palette.purple};
    animation-duration: 0.9s;
  }
`;

export const DotStyled = styled.span`
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  background-color: ${Palette.primary};
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

export const LoaderTextStyled = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${Palette.gray};
  letter-spacing: -0.14px;
  animation: ${fade} 0.4s ease-out;
`;
