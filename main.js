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
		squares.forEach(square => square.addEventListener('click', handleClick));
	};

	const handleClick = e => game.getCurrentPlayer().takeSquare(e);

	const disable = () => {
		const squares = document.querySelectorAll('.square');
		squares.forEach(square => square.removeEventListener('click', handleClick));
	};

	return { squares, disable, render };
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
		game.toggleCurrentPlayer();
		displayController.toggleDisplay();
		gameBoard.render();
		game.checkWin();
	};

	return { name, piece, takeSquare };
};

const game = (() => {
	const init = () => {
		playerOne = playerFactory(document.querySelector('#player-one').value || 'X', 'X');
		playerTwo = playerFactory(document.querySelector('#player-two').value || 'O', 'O');
		currentPlayer = playerOne;
		gameBoard.squares = new Array(9);
		gameBoard.render();
		displayController.toggleButton();
		displayController.displayText.classList.remove('win');
		displayController.displayText.classList.remove('tie');
		displayController.toggleDisplay();
		displayController.hideForm();
	};

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
		const combos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		const squares = gameBoard.squares;
		let winningCombo = null;

		for (let i = 0; i < combos.length; i++) {
			if (
				squares[combos[i][0]] === 'X' &&
				squares[combos[i][1]] === 'X' &&
				squares[combos[i][2]] === 'X'
			) {
				// p1 wins
				winningCombo = combos[i];
				gameOver(playerOne, winningCombo);
			} else if (
				squares[combos[i][0]] === 'O' &&
				squares[combos[i][1]] === 'O' &&
				squares[combos[i][2]] === 'O'
			) {
				// p2 wins
				winningCombo = combos[i];
				gameOver(playerTwo, winningCombo);
			}
		}

		if (!squares.includes(undefined) && winningCombo === null) {
			// it's a tie
			gameOver();
		}
	};

	const gameOver = (player, combo) => {
		if (player && combo) {
			displayController.displayText.classList.add('win');
			displayController.displayText.textContent = player.name + ' wins!';
		} else {
			displayController.displayText.classList.add('tie');
			displayController.displayText.textContent = "IT'S A TIE!";
		}
		gameBoard.disable();
		displayController.displayBtn.textContent = 'Play Again?';
		displayController.toggleButton();
	};

	return { getCurrentPlayer, init, toggleCurrentPlayer, checkWin };
})();

const displayController = (() => {
	const displayBtn = document.querySelector('.display-btn');
	const displayText = document.querySelector('.display-text');
	const displayForm = document.querySelector('.display-form');

	const toggleButton = () => {
		displayBtn.classList.toggle('hide');
	};

	const toggleDisplay = () => {
		if (game.getCurrentPlayer()) {
			displayText.textContent = `${game.getCurrentPlayer().name}'s turn`;
		}
	};

	const hideForm = () => {
		displayForm.classList.add('hide');
	};

	return { toggleButton, toggleDisplay, hideForm, displayText, displayBtn };
})();

// Start the game!
displayController.displayText.textContent = 'Enter Player Names';

gameBoard.render();
gameBoard.disable();

// TODO
// get form to work
