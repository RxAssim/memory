import React from "react";
import styled from "styled-components";

interface CardProps {
  name: string;
  flipped: boolean;
  solved: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Card = styled.div<CardProps>`
  height: 100px;
  width: 100px;
  border-radius: 20px;
  &:focus {
    ${p => (p.flipped || p.solved ? `` : "background: " + p.theme.colors.blue)};
  }
  &:active {
    ${p => (p.flipped || p.solved ? `` : "background: " + p.theme.colors.blue)};
  }
  &:hover {
    ${p => (p.flipped || p.solved ? `` : "background: " + p.theme.colors.blue)};
  }
  @media screen and (max-width: 768px) {
    height: 100px;
    width: 100px;
  }
  @media screen and (max-width: 425px) {
    height: 80px;
    width: 80px;
  }
  margin: 10px;
  cursor: ${p => (p.solved || p.flipped ? "default" : "pointer")};
  background: ${p =>
    p.flipped || p.solved
      ? `url('/img/${p.name}.png')`
      : p.theme.colors.yellow};
  background-size: cover;
`;

export default Card;
