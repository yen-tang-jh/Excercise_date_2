const findLineWinner = (currentPositionOfSquare, numOfLine) => {
	const positionWin = currentPositionOfSquare.x * numOfLine + currentPositionOfSquare.y;
	const line = [positionWin];
	switch (currentPositionOfSquare.type) {
		case 1:
			for (let k = 1; k < 5; k++) {
				line.push(positionWin + k);
			}
			break;
		case 2:
			for (let k = 1; k < 5; k++) {
				line.push((positionWin.x + k) * numOfLine + positionWin.y);
			}
			break;
		case 3:
			for (let k = 1; k < 5; k++) {
				line.push((positionWin.x + k) * numOfLine + positionWin.y + k);
			}
			break;
		case 4:
			for (let k = 1; k < 5; k++) {
				line.push((positionWin.x + k) * numOfLine + positionWin.y - k);
			}
			break;
		default:
			return null;
	}

	return line;
};
export const calculateWinner = (squares, numOfLine) => {
	let isWin = false;
	let winCase = 0;
	let currentPositionOfSquare = { x: -1, y: -1, type: 0 };

	for (let i = 0; i < numOfLine; i++) {
		for (let j = 0; j < numOfLine; j++)
			if (squares[i * numOfLine + j] && !isWin) {
				isWin = true;
				winCase = 1;

				// Case 1: consider 5 square next to current square
				for (let k = 1; k < 5; k++) {
					if (j + k >= numOfLine || squares[i * numOfLine + (j + k)] !== squares[i * numOfLine + j]) {
						isWin = false;
						winCase = 0;
						break;
					}
				}

				// Case 2: consider 5 square under the current square
				if (!isWin) {
					isWin = true;
					winCase = 2;

					for (let k = 1; k < 5; k++) {
						if (i + k >= numOfLine || squares[(i + k) * numOfLine + j] !== squares[i * numOfLine + j]) {
							isWin = false;
							winCase = 0;
							break;
						}
					}
				}

				// Case 3: consider 5 square on the bottom diagonal
				if (!isWin) {
					isWin = true;
					winCase = 3;
					for (let k = 1; k < 5; k++) {
						if (
							i + k >= numOfLine ||
							j + k >= numOfLine ||
							squares[(i + k) * numOfLine + j + k] !== squares[i * numOfLine + j]
						) {
							isWin = false;
							winCase = 0;
							break;
						}
					}
				}

				// Case 4: consider 5 square on the top diagonal
				if (!isWin) {
					isWin = true;
					winCase = 4;
					for (let k = 1; k < 5; k++) {
						if (
							i + k >= numOfLine ||
							j - k < 0 ||
							squares[(i + k) * numOfLine + j - k] !== squares[i * numOfLine + j]
						) {
							isWin = false;
							winCase = 0;
							break;
						}
					}
				}

				if (isWin) {
					currentPositionOfSquare = { x: i, y: j, type: winCase };
				}
			}
	}

	if (isWin) {
		const lineWinner = findLineWinner(currentPositionOfSquare, numOfLine);
		return {
			winner: squares[currentPositionOfSquare.x * numOfLine + currentPositionOfSquare.y],
			lineWinner: lineWinner,
		};
	}

	return null;
};
