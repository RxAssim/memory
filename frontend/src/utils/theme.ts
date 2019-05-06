import baseStyled, { ThemedStyledInterface } from "styled-components";

export const theme = {
  colors: {
    black: "#000",
    blue: "#44b5ff",
    darkGrey: "#3c3c3c",
    white: "#fff",
    lightBlue: "#44b5cc",
    grey: "#C2C2C2",
    yellow: "#FFE81E",
    red: "#E0115F"
  },
  breakpoints: {
    laptop: "1024px",
    tablet: "768px",
    mobileM: "375px",
    mobileS: "320px"
  }
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
