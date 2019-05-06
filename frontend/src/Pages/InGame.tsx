import React, { useState, useEffect, useCallback } from "react";
import { secondsToMinutesAndSeconds, initializeDeck } from "../utils/helpers";

import Card from "../components/Card";
import { MemoryHistory } from "history";
import Cookies from "js-cookie";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import {
  HeartsWrapper,
  SFilledHeart,
  SEmptyHeart,
  Wrapper,
  Header,
  BoardWrapper,
  Button,
  CounterWrapper
} from "../components/InGame.components";

interface Pokemon {
  id: number;
  name: string;
}

const SAVE_SCORE = gql`
  mutation saveScore($score: Int!) {
    saveScore(score: $score) {
      id
    }
  }
`;

const MaxHearts = 10;

interface HeartsProps {
  max: number;
  lost: number;
}

const Hearts: React.FC<HeartsProps> = props => {
  function initArray(length: number): Array<string> {
    return new Array(length).fill("heart");
  }
  return (
    <HeartsWrapper>
      {initArray(props.max - props.lost).map((x, i) => (
        <SFilledHeart key={"filled" + i} />
      ))}
      {initArray(props.lost).map((x, i) => (
        <SEmptyHeart key={"empty" + i} />
      ))}
    </HeartsWrapper>
  );
};

interface Props {
  history: MemoryHistory;
}

const InGame: React.FC<Props> = props => {
  const [cards, setCards] = useState<Array<Pokemon>>([]);
  const [hearts, setHearts] = useState<number>(MaxHearts);
  const [score, setScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [flipped, setFlipped] = useState<Array<number>>([]);
  const [solved, setSolved] = useState<Array<number>>([]);
  const [disabled, setDisabled] = useState(false);

  const saveScore = useMutation(SAVE_SCORE, { variables: { score } });

  const calculateScoreAndShowLeaderboard = useCallback(async () => {
    await saveScore();
    Cookies.remove("token");
    props.history.push("/leaderboard");
  }, [props.history, saveScore]);

  useEffect(() => {
    if (solved.length === 16) {
      calculateScoreAndShowLeaderboard();
    }
  }, [calculateScoreAndShowLeaderboard, solved]);

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    if (hearts === 0) {
      calculateScoreAndShowLeaderboard();
    }
  }, [calculateScoreAndShowLeaderboard, hearts]);

  useEffect(() => {
    if (countdown % 30 === 0) {
      setScore(score => score - 20);
    }
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  const isAMatch = (id: number) => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    return flippedCard && clickedCard && flippedCard.name === clickedCard.name;
  };

  const sameCardClickedTwice = (id: number) => flipped.includes(id);

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const handleReset = () => {
    resetCards();
    setSolved([]);
    setHearts(MaxHearts);
    setCards(initializeDeck());
    setCountdown(0);
  };

  const handleClick = (id: number) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped(flipped => [...flipped, id]);
      setDisabled(false);
    } else {
      if (sameCardClickedTwice(id)) {
        setDisabled(false);
        return;
      }
      if (isAMatch(id)) {
        setSolved([...solved, ...flipped, id]);
        setScore(score => score + 20);
        resetCards();
      } else {
        setFlipped(flipped => [...flipped, id]);
        setHearts(hearts => hearts - 1);
        setTimeout(resetCards, 1000);
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <Button onClick={handleReset}>Reset</Button>
      </Header>
      <BoardWrapper>
        <CounterWrapper>{secondsToMinutesAndSeconds(countdown)}</CounterWrapper>
        <Hearts max={MaxHearts} lost={MaxHearts - hearts} />
        <>
          {cards.map(pokemon => (
            <Card
              name={pokemon.name}
              key={pokemon.id}
              flipped={flipped.includes(pokemon.id)}
              solved={solved.includes(pokemon.id)}
              onClick={() => (disabled ? null : handleClick(pokemon.id))}
            />
          ))}
        </>
      </BoardWrapper>
    </Wrapper>
  );
};

export default InGame;
