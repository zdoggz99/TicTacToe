// module for game board
// module for display controller
// factories for players
// modules are for functions only!
const playerArray = [];
let currentPlayer = 0;
let playerCount = 0;
const boardArray = [];
let size = 10;
const gameBoard = {
  create: function (size) {
    // getting and creating all necessary bits for adding the table to the DOM
    const boardContainer = document.querySelector(".boardContainer");

    // loops through board and creates spots
    for (let i = 0; i < size * size; i++) {
      const playSpace = document.createElement("div");
      boardContainer.appendChild(playSpace);
      playSpace.classList.add("playSpace");
      boardArray.push(playSpace);
      playSpace.style.height = (40 - 0.5 * (size - 2)) / size + "rem";
      playSpace.style.width = (40 - 0.5 * (size - 2)) / size + "rem";
      playSpace.style.fontSize = ((40 - 0.5 * (size - 2)) / size) * 6 + "px";
    }

    // checks to see what was clicked, then runs logic
    boardArray.forEach((item) => {
      item.addEventListener("click", (e) => {
        let clicked = e.currentTarget;
        playerTurn(clicked);
      });
    });
  },
};

function* generator() {
  yield "X";
  yield "O";
  yield "A";
  yield "Y";
  yield "M";
}

const playerChars = generator();

const player = (name, symbol) => {
  this.name = name;
  let wins = 0;
  let losses = 0;
  return { name, wins, losses, symbol };
};

function playerTurn(clicked) {
  if (clicked.textContent == "") {
    playerArray[currentPlayer];
    clicked.textContent = playerArray[currentPlayer].symbol;
    if (currentPlayer == playerCount - 1) {
      currentPlayer = 0;
    } else {
      currentPlayer++;
    }
    checkWin.checkStraight();
    checkWin.checkDiagonal(false);
    checkWin.checkDiagonal(true);
  }
}

const diaArray = [];

const checkWin = {
  checkStraight: function () {
    diaArray.length = 0;
    const symbolArray = [];
    let currentSpace = 0;
    for (let x = 0; x < size; x++) {
      let rowSymbols = "";
      let colSymbols = "";
      for (let y = 0; y < size; y++) {
        currentRowSpace = boardArray[parseInt(x.toString() + y.toString())];
        currentColSpace = boardArray[parseInt(y.toString() + x.toString())];
        currentRowSpace.textContent == ""
          ? (rowSymbols += "$")
          : (rowSymbols += currentRowSpace.textContent);
        console.log(currentColSpace);
        currentColSpace.textContent == ""
          ? (colSymbols += "$")
          : (colSymbols += currentColSpace.textContent);
      }
      symbolArray.push(rowSymbols);
      symbolArray.push(colSymbols);
      diaArray.push(rowSymbols);
    }
    symbolArray.forEach((item) => {
      const match = /([\w])\1{2}/.test(item);
      if (match) {
        alert(playerArray[currentPlayer - 1].name + " Wins!");
      }
    });
  },

  checkDiagonal: function (fromBottom) {
    var length = { x: diaArray[0].length, y: diaArray.length };
    length.max = Math.max(length.x, length.y);

    var temp, k, x, y;

    var returnMe = [];

    for (k = 0; k <= 2 * (length.max - 1); ++k) {
      for (temp = [], y = length.y - 1; y >= 0; --y) {
        x = k - (fromBottom ? length.y - y : y);
        x >= 0 && x < length.x && temp.push(diaArray[y][x]);
      }
      temp.length > 0 && returnMe.push(temp.join(""));
    }
    returnMe.forEach((item) => {
      const match = /([\w])\1{2}/.test(item);
      if (match) {
        alert(playerArray[currentPlayer - 1].name + " Wins!");
      }
    });
  },
};

function setup() {
  while (playerCount < 2 || playerCount > 5 || isNaN(playerCount)) {
    playerCount = prompt("How Many Players? (2 - 5)");
  }
  for (let i = 0; i < playerCount; i++) {
    let playerName = prompt("Player " + (i + 1) + " name");
    playerArray.push(player(playerName, playerChars.next().value));
  }
}

setup();
gameBoard.create(10);
