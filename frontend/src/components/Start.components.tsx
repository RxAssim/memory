import { styled } from "../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const ErrorText = styled.span`
  font-family: MavenPro-Black;
  color: ${p => p.theme.colors.red};
  text-align: center;
  text-transform: capitalize;
  margin-top: 20px;
  font-size: 20px;
`;

export const Label = styled.label`
  font-family: MavenPro-Black;
  font-size: 40px;
  color: ${p => p.theme.colors.blue};
  text-align: left;
  @media screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    font-size: 30px;
  }
`;

export const Input = styled.input`
  border: none;
  background: none;
  font-family: MavenPro-Bold;
  font-size: 40px;
  display: flex;
  flex: 1;
  width: 100px;
  color: ${p => p.theme.colors.darkGrey};
  text-align: center;
  @media screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    font-size: 30px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 50px;
`;

export const Button = styled.button`
  background-color: ${p =>
    p.disabled ? p.theme.colors.grey : p.theme.colors.blue};
  border: none;
  margin-bottom: 30px;
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

export const Form = styled.form`
  @media screen and (min-width: ${p => p.theme.breakpoints.laptop}) {
    width: 768px;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.laptop}) {
    width: 60%;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    width: 80%;
  }
`;
