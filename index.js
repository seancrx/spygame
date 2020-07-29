const express = require('express');
const path = require('path');

const categories = require('./categories');

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// Game level variables
let gameRooms = [];
const numOfPlayers = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const categoriesName = categories.map(category => category.name);

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`App started on port ${port}...`);
});

app.get('/api/createRoom', function (req, res) {
  const gameCode = generateGameCode();
  gameRooms.push({
    code: gameCode,
    category: undefined,
    answer: undefined,
    numOfPlayers: undefined,
    availableSeats: undefined
  });
  console.log(gameRooms);
  setTimeout(clearGameCode, 1000 * 60 * 60 * 1, gameCode);
  res.json({ code: gameCode, categories: categoriesName, numOfPlayers: numOfPlayers });
});

app.get('/api/startRoom/:code/:category/:num', function (req, res) {
  let spies = [];
  if (req.params.num <= 5) {
    spies.push(Math.floor(Math.random() * req.params.num));
  } else if (req.params.num >= 11) {
    while (spies.length < 3) {
      let rand = Math.floor(Math.random() * req.params.num);
      if (!spies.includes(rand)) spies.push(rand);
    }
  } else {
    while (spies.length < 2) {
      let rand = Math.floor(Math.random() * req.params.num);
      if (!spies.includes(rand)) spies.push(rand);
    }
  }
  gameRooms = gameRooms.map(gameRoom => {
    if (gameRoom.code === req.params.code) {
      return {
        code: gameRoom.code,
        category: req.params.category,
        answer: categories.filter(category => category.name === req.params.category)[0].answers[Math.floor(Math.random() * categories.filter(category => category.name === req.params.category)[0].answers.length)],
        numOfPlayers: req.params.num,
        availableSeats: req.params.num,
        spies: spies
      };
    } else {
      return gameRoom;
    }
  });
  console.log(gameRooms);
  res.json({ msg: 'OK' });
});

app.get('/api/enterRoom/:code', function (req, res) {
  console.log('Join game == ', gameRooms);
  const currentGame = gameRooms.filter(gameRoom => gameRoom.code === req.params.code)[0];
  console.log(currentGame);
  if (!currentGame) {
    res.json({
      category: 'Invalid Game Code',
      answer: 'Invalid Game Code'
    });
  } else if (!currentGame.availableSeats > 0) {
    res.json({
      category: currentGame.category,
      answer: 'No More Seat Available'
    });
  } else {
    gameRooms = gameRooms.map(gameRoom => gameRoom.code === req.params.code ? { ...gameRoom, availableSeats: --currentGame.availableSeats } : gameRoom);
    res.json({
      category: currentGame.category,
      answer: currentGame.spies.includes(currentGame.availableSeats) ? '' : currentGame.answer
    });
  }
  console.log(currentGame);
});

function generateGameCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i=0; i<4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  if (gameRooms.map(gameRoom => gameRoom.code).includes(code)) {
    code = generateGameCode();
  }
  return code;
}

function clearGameCode(code) {
  gameRooms = gameRooms.filter(gameRoom => gameRoom.code !== code);
  console.log(gameRooms);
}