import { styled } from "../utils/theme";

const Button = styled.button`
  background-color: ${p =>
    p.disabled ? p.theme.colors.grey : p.theme.colors.blue};
  border: none;
  color: ${p => p.theme.colors.white};
  font-family: MavenPro-Black;
  font-size: 40px;
  text-align: center;
  width: 100%;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 300ms;
  &:hover {
    background-color: ${p =>
      p.disabled ? p.theme.colors.grey : p.theme.colors.lightBlue};
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    height: 70px;
    font-size: 30px;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.mobileS}) {
    height: 50px;
    font-size: 20px;
  }
`;

export default Button;
