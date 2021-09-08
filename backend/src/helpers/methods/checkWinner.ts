import { EMPTY, NO_WINNER } from "../constant";

export const checkWinner = (
  player: string,
  data: { id: number; value: string }[]
) => {
  const check1 =
    data[0].value === player &&
    data[1].value === player &&
    data[2].value === player;

  const check2 =
    data[3].value === player &&
    data[4].value === player &&
    data[5].value === player;

  const check3 =
    data[6].value === player &&
    data[7].value === player &&
    data[8].value === player;

  const check4 =
    data[0].value === player &&
    data[4].value === player &&
    data[8].value === player;

  const check5 =
    data[2].value === player &&
    data[4].value === player &&
    data[6].value === player;

  const check6 =
    data[0].value === player &&
    data[3].value === player &&
    data[6].value === player;

  const check7 =
    data[1].value === player &&
    data[4].value === player &&
    data[7].value === player;

  const check8 =
    data[2].value === player &&
    data[5].value === player &&
    data[8].value === player;

  const no_winner = data.filter((obj) => obj.value === EMPTY).length === 0;

  if (
    check1 ||
    check2 ||
    check3 ||
    check4 ||
    check5 ||
    check6 ||
    check7 ||
    check8
  ) {
    return player;
  }

  if (no_winner) {
    return NO_WINNER;
  }

  return EMPTY;
};
