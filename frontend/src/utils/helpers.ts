interface Pokemon {
  id: number;
  name: string;
}

const Pokemons: Array<string> = [
  "arbok",
  "clefairy",
  "ekans",
  "fearow",
  "nidorina",
  "pikachu",
  "raichu",
  "sandshrew"
];

export function secondsToMinutesAndSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;
  return minutes + ":" + (formattedSeconds < 10 ? "0" : "") + formattedSeconds;
}

export function shuffle(array: Array<Pokemon>) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export function initializeDeck() {
  let id = 0;
  const cards = Pokemons.reduce(
    (acc, name) => {
      acc.push(
        ...[
          {
            id: id++,
            name
          },
          {
            id: id++,
            name
          }
        ]
      );
      return acc;
    },
    [] as Pokemon[]
  );
  return shuffle(cards);
}
