import { styled } from "../utils/theme";
import BaseButton from "./Button";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const H1 = styled.h1`
  font-family: MavenPro-Black;
  font-size: 40px;
  color: ${p => p.theme.colors.darkGrey};
  text-transform: capitalize;
  text-align: center;
`;

export const ListWrapper = styled.ul`
  width: ${p => p.theme.breakpoints.mobileS};
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const Row = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

interface TextProps {
  color: "blue" | "black";
}

export const Text = styled.p<TextProps>`
  font-family: MavenPro-Black;
  text-transform: capitalize;
  font-size: 40px;
  color: ${p => p.theme.colors.darkGrey};
  text-align: left;
  margin: 0;
  color: ${p => p.theme.colors[p.color]};
  @media screen and (max-width: ${p => p.theme.breakpoints.mobileM}) {
    font-size: 30px;
  }
`;
export const Div = styled.div`
  display: flex;
`;

export const Button = styled(BaseButton)`
  width: calc(100% - 20px);
  @media screen and (min-width: ${p => p.theme.breakpoints.mobileM}) {
    width: ${p => p.theme.breakpoints.mobileM};
  }
`;
