import React from "react";
import BaseButton from "../components/Button";
import { styled } from "../utils/theme";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { MemoryHistory } from "history";
import {
  Row,
  Div,
  Text,
  ListWrapper,
  Wrapper,
  H1,
  Button
} from "../components/Leaderboard.components";

interface PRProps {
  order: number;
  name: string;
  score: number;
}
interface Player {
  id: number;
  name: string;
  score: number;
}

const LEADERBOARD = gql`
  {
    leaderboard {
      id
      name
      score
    }
  }
`;

const PlayerRow: React.FC<PRProps> = ({ order, name, score }) => {
  return (
    <Row>
      <Div>
        <Text color="blue">{order}</Text>
        <Text color="black">{name}</Text>
      </Div>
      <Text color="blue">{score}</Text>
    </Row>
  );
};

interface Props {
  history: MemoryHistory;
}

const Leaderboard: React.FC<Props> = props => {
  const { loading, data } = useQuery(LEADERBOARD, {
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    props.history.push("/");
  };

  return (
    <Wrapper>
      <H1>Leaderboard</H1>
      <ListWrapper>
        {data.leaderboard.map((player: Player, i: number) => (
          <PlayerRow
            key={player.id}
            order={i + 1}
            name={player.name}
            score={player.score}
          />
        ))}
      </ListWrapper>
      <Button onClick={handleClick}>Restart</Button>
    </Wrapper>
  );
};

export default Leaderboard;
