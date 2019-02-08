/*================
******Homework on Events****
* Homework Assignment #8: Events
 
 You can think of this homework as a warmup to project #1 (coming directly after this assignment). Don't worry too much about making this homework perfect, save your energy (and sanity) for the larger project. For this assignment we'll just be looking to see that you covered the basic functionality.

Your assignment is to create a tic-tac-toe game out of HTML, CSS and Javascript. You should have a single HTML page, one accompanying JS file, and one accompanying CSS file.

1. When the page loads, only the game board should be displayed (draw the game board any way you see fit).

2. When a user clicks within the game board (in an empty space) their mark (either "X" or "O" should appear there). "X" goes first. So the first valid click on the game board should produce an "X". The second should produce an "O", and then they should trade off.

 3. The "X" s should be red, and the "O"s should be black.

4. If someone wins (gets three in a row), you should make a dialog box appear on the screen that says either "X has won!" or "O has won!" And when the dialog box is closed, the game should be reset to its beginning state.

5. If all the areas of the board get filled but nobody wins, a dialog box appear on the screen that says either "Cats game!" And when the dialog box is closed, the game should be reset to its beginning state. (What does cat's game mean?)
=========*/

const player = ["X", "O"];

// Get players' names
const playerName = [
  prompt("First player! Please enter your name to play"),
  prompt("Second player! Please enter your name to play")
];
let currentTurn;
let noOfMoves;
const boxes = document.querySelectorAll(".box");
const winner = document.querySelector(".winner");
const replay = document.querySelector(".replay");
const restart = document.querySelector(".reset");
const body = document.querySelector("body");
const result = document.querySelector(".result");
const msg = document.querySelector(".message");
const turn = document.querySelector(".turn");

// Make win combinations array
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

// startGame function
const startGame = e => {
  currentTurn = 1;
  noOfMoves = [0, 0];

  for (let box of boxes) {
    box.addEventListener("click", playGame);
    replayGame(e, box);
    restartGame(e, box);
  }
};

function playGame(e, box) {
  // Turn players based on currentTurn value.
  if (e.target.innerHTML === "" && currentTurn % 2 === 1) {
    e.target.innerHTML = player[0];
    e.target.style.color = "red";
    turn.innerHTML = `${playerName[1] || player[1]}'s turn`;
    turn.style.display = "block";
    noOfMoves[0]++;
  } else if (e.target.innerHTML === "" && currentTurn % 2 === 0) {
    e.target.innerHTML = player[1];
    e.target.style.color = "#000";
    turn.innerHTML = `${playerName[0] || player[0]}'s turn`;
    turn.style.display = "block";
    noOfMoves[1]++;
  } else if (e.target.innerHTML === "X" || e.target.innerHTML === "O") {
    msg.innerHTML = "please select an empty box";
    msg.style.display = "block";
  } else if (winCondX || winCondO || draw) {
    //e.target.style.background = "#eee";
    turn.innerHTML = "Game over! Click replay to start again!";
  }

  currentTurn++;
  let moves = noOfMoves.reduce((a, b) => a + b);
  getWinner(e, moves);
}

// Get winner or Tie
const getWinner = (e, moves) => {
  let box0 = document.querySelector(".box0"),
    box1 = document.querySelector(".box1"),
    box2 = document.querySelector(".box2"),
    box3 = document.querySelector(".box3"),
    box4 = document.querySelector(".box4"),
    box5 = document.querySelector(".box5"),
    box6 = document.querySelector(".box6"),
    box7 = document.querySelector(".box7"),
    box8 = document.querySelector(".box8");

  // declare winning conditions for player X
  let winCondX =
    (e.target.innerHTML !== "" &&
      box0.innerHTML === "X" &&
      box0.innerHTML === box1.innerHTML &&
      box1.innerHTML === box2.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box3.innerHTML === "X" &&
      box3.innerHTML === box4.innerHTML &&
      box4.innerHTML === box5.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box6.innerHTML === "X" &&
      box6.innerHTML === box7.innerHTML &&
      box7.innerHTML === box8.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box0.innerHTML === "X" &&
      box0.innerHTML === box3.innerHTML &&
      box3.innerHTML === box6.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box1.innerHTML === "X" &&
      box1.innerHTML === box4.innerHTML &&
      box4.innerHTML === box7.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box2.innerHTML === "X" &&
      box2.innerHTML === box5.innerHTML &&
      box5.innerHTML === box8.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box2.innerHTML === "X" &&
      box2.innerHTML === box4.innerHTML &&
      box4.innerHTML === box6.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box0.innerHTML === "X" &&
      box0.innerHTML === box4.innerHTML &&
      box4.innerHTML === box8.innerHTML);

  // declare winning conditions for player O
  let winCondO =
    (e.target.innerHTML !== "" &&
      box0.innerHTML === "O" &&
      box0.innerHTML === box1.innerHTML &&
      box1.innerHTML === box2.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box3.innerHTML === "O" &&
      box3.innerHTML === box4.innerHTML &&
      box4.innerHTML === box5.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box6.innerHTML === "O" &&
      box6.innerHTML === box7.innerHTML &&
      box7.innerHTML === box8.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box0.innerHTML === "O" &&
      box0.innerHTML === box3.innerHTML &&
      box3.innerHTML === box6.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box1.innerHTML === "O" &&
      box1.innerHTML === box4.innerHTML &&
      box4.innerHTML === box7.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box2.innerHTML === "O" &&
      box2.innerHTML === box5.innerHTML &&
      box5.innerHTML === box8.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box2.innerHTML === "O" &&
      box2.innerHTML === box4.innerHTML &&
      box4.innerHTML === box6.innerHTML) ||
    (e.target.innerHTML !== "" &&
      box0.innerHTML === "O" &&
      box0.innerHTML === box4.innerHTML &&
      box4.innerHTML === box8.innerHTML);
  // draw condition
  const draw = !winCondO && !winCondX && moves === 9;

  if (winCondX) {
    result.innerHTML = `${playerName[0] ||
      player[0]} Wins! <br> click replay to replay again`;
    result.style.display = "block";
  } else if (winCondO) {
    result.innerHTML = `${playerName[1] ||
      player[1]} Wins! <br> click replay to replay again`;
    result.style.display = "block";
    // declare conditions for Tie
  } else if (draw) {
    result.innerHTML = `Hurray! It's a Tie! Replay!`;
    result.style.display = "block";
  }
};

// replay game function on replay button click.
const replayGame = (e, box) => {
  replay.addEventListener("click", () => {
    box.innerHTML = "";
    noOfMoves = [0, 0];
    result.style.display = "none";
    msg.style.display = "none";
  });
};

// define restart conditions (click of restart button) with function
// reset currentTurn to initial start condition with possibility of new set of players.
const restartGame = (e, box) => {
  restart.addEventListener("click", () => {
    result.style.display = "none";
    currentTurn = 1;
    noOfMoves = [0, 0];
    box.innerHTML = "";
    msg.style.display = "none";
  });
};

// Get new players names after restarting

startGame();
