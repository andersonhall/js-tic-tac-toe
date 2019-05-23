const gameBoard = (() => {
	const squares = new Array(9);

	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

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
			square.addEventListener('click', e => game.getCurrentPlayer().takeSquare(e))
		);
	};

	return { squares, winningCombos, render };
})();

const playerFactory = (name, piece) => {
	const takeSquare = e => {
		const index = e.target.dataset.index;
		game.getCurrentPlayer().piece;
		if (gameBoard.squares[index] == undefined) {
			gameBoard.squares[index] = game.getCurrentPlayer().piece;
		} else {
			return false;
		}
		game.checkWin();
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
		const combos = gameBoard.winningCombos;
		const squares = gameBoard.squares;
		for (let i = 0; i < combos.length; i++) {
			if (
				squares[combos[i][0]] === 'X' &&
				squares[combos[i][1]] === 'X' &&
				squares[combos[i][2]] === 'X'
			) {
				console.log('p1 wins');
				console.log(combos[i]);
				return;
			} else if (
				squares[combos[i][0]] === 'O' &&
				squares[combos[i][1]] === 'O' &&
				squares[combos[i][2]] === 'O'
			) {
				console.log('p2 wins');
				console.log(combos[i]);
				return;
			} else if (!squares.includes(undefined)) {
				// it's a tie
				console.log('tie');
				return;
			}
		}
	};

	return { getCurrentPlayer, init, toggleCurrentPlayer, checkWin };
})();

//  MY CUSTOM CONSOLE
const p = document.createElement('p');
p.textContent = 'console';
p.style = 'color: red; font-size: 3rem; text-align: center';
document.querySelector('.console').appendChild(p);

// Start the game!
game.init();

// todo
// add win/tie logic
// add display & logic
// add ability to name players, play again, etc...
