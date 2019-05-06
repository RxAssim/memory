import { styled } from "../utils/theme";
import { ReactComponent as FilledHeart } from "../assets/filledheart.svg";
import { ReactComponent as EmptyHeart } from "../assets/emptyheart.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
`;

export const CounterWrapper = styled.div`
  font-family: MavenPro-Black;
  font-size: 40px;
  color: ${p => p.theme.colors.black};
  margin-bottom: 30px;
`;

export const Header = styled.nav`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  color: ${p => p.theme.colors.blue};
  background: none;
  font-size: 40px;
  font-family: MavenPro-Black;
  border: none;
  cursor: pointer;
`;

export const SFilledHeart = styled(FilledHeart)`
  height: 40px;
  width: 40px;
`;

export const SEmptyHeart = styled(EmptyHeart)`
  height: 40px;
  width: 40px;
`;

export const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 60%;
  @media screen and (min-width: ${p => p.theme.breakpoints.laptop}) {
    width: 500px;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.laptop}) {
    width: 60%;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const HeartsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
`;
