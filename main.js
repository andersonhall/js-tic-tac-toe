const gameBoard = (() => {
  const squares = new Array(9);

  const render = () => {
    // Select gameboard div element and append array of squares
    const gameBoardEl = document.querySelector('.game-board');
    gameBoardEl.innerHTML = '';

    for (let i = 0; i < gameBoard.squares.length; i++) {
      let square = document.createElement('div');
      square.dataset.index = i;
      square.classList.add('square');
      square.textContent = gameBoard.squares[i];
      gameBoardEl.appendChild(square);
    }

    // Square Listeners
    const squares = document.querySelectorAll('.square');
    squares.forEach(square =>
      square.addEventListener('click', e =>
        game.getCurrentPlayer().takeSquare(e)
      )
    );
  };

  return { squares, render };
})();

const playerFactory = (name, piece) => {
  const takeSquare = e => {
    const idx = e.target.dataset.index;
    game.getCurrentPlayer().piece;
    if (gameBoard.squares[idx] == null) {
      gameBoard.squares[idx] = game.getCurrentPlayer().piece;
    } else {
      return false;
    }
    game.toggleCurrentPlayer();
    gameBoard.render();
  };

  return { name, piece, takeSquare };
};

const displayController = (() => {
  // display logic
})();

const game = (() => {
  // Initialize the game
  const init = () => {
    gameBoard.render();
  };

  // Setup Players
  const playerOne = playerFactory('Andy', 'X');
  const playerTwo = playerFactory('Jenny', 'O');
  let currentPlayer = playerOne;

  const getCurrentPlayer = () => {
    if (currentPlayer === playerOne) {
      return playerOne;
    } else {
      return playerTwo;
    }
  };

  const toggleCurrentPlayer = () => {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  };

  const checkWin = () => {
    // win logic
  };

  return { getCurrentPlayer, init, toggleCurrentPlayer, checkWin };
})();

//  MY CUSTOM CONSOLE
const p = document.createElement('p');
p.textContent = 'console';
document.querySelector('.console').appendChild(p);

// Start the game!
game.init();

// todo
// add win/tie logic
// add display & logic
// add ability to name players, play again, etc...