import express from "express";
import http from "http";
import cors from "cors";
import { EMPTY, PORT } from "./helpers/constant";
import { checkWinner } from "./helpers/methods/checkWinner";

const app = express();
const http_server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The game data default value
let data = [
  { id: 1, value: EMPTY },
  { id: 2, value: EMPTY },
  { id: 3, value: EMPTY },
  { id: 4, value: EMPTY },
  { id: 5, value: EMPTY },
  { id: 6, value: EMPTY },
  { id: 7, value: EMPTY },
  { id: 8, value: EMPTY },
  { id: 9, value: EMPTY },
];

// Player
const X = "X";
const O = "O";
let current_player = X; //default
let winner = EMPTY; //default

app.get("/", (req, res) => {
  // http reponse
  res.send({ data, player: current_player, winner });
});

app.post("/player/move", (req, res) => {
  const { id, player } = req.body;
  const hasNoWinner = winner === EMPTY;
  if (hasNoWinner) {
    data.map((obj) =>
      obj.id === id && obj.value === EMPTY
        ? Object.assign(obj, { id, value: player })
        : obj
    );
    current_player = player === X ? O : X;
  }

  const hasWinner = checkWinner(player, data) !== EMPTY;
  if (hasWinner) {
    winner = checkWinner(player, data);
  }

  // http response
  res.send({ data, player: current_player, winner });
});

app.post("/new_game", (req, res) => {
  data.map((obj) => Object.assign(obj, { id: obj.id, value: EMPTY }));
  current_player = X;
  winner = EMPTY;
  // http response
  res.send({ data, player: current_player, winner });
});

//http server
http_server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
