const findLineWinner = (post, n) => {
	const postWin = post.x * n + post.y;
	const line = [postWin];
	switch (post.type) {
		case 1:
			for (let k = 1; k < 5; k++) {
				line.push(postWin + k);
			}
			break;
		case 2:
			for (let k = 1; k < 5; k++) {
				line.push((post.x + k) * n + post.y);
			}
			break;
		case 3:
			for (let k = 1; k < 5; k++) {
				line.push((post.x + k) * n + post.y + k);
			}
			break;
		case 4:
			for (let k = 1; k < 5; k++) {
				line.push((post.x + k) * n + post.y - k);
			}
			break;
		default:
			return null;
	}

	return line;
};
export const calculateWinner = (squares, n) => {
	let isWin = false;
	let typeLine = 0;
	let post = { x: -1, y: -1, type: 0 };

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++)
			if (squares[i * n + j] && !isWin) {
				isWin = true;
				typeLine = 1;

				for (let k = 1; k < 5; k++) {
					if (j + k >= n || squares[i * n + (j + k)] !== squares[i * n + j]) {
						isWin = false;
						typeLine = 0;
						break;
					}
				}

				if (!isWin) {
					isWin = true;
					typeLine = 2;

					for (let k = 1; k < 5; k++) {
						if (i + k >= n || squares[(i + k) * n + j] !== squares[i * n + j]) {
							isWin = false;
							typeLine = 0;
							break;
						}
					}
				}

				if (!isWin) {
					isWin = true;
					typeLine = 3;
					for (let k = 1; k < 5; k++) {
						if (i + k >= n || j + k >= n || squares[(i + k) * n + j + k] !== squares[i * n + j]) {
							isWin = false;
							typeLine = 0;
							break;
						}
					}
				}

				if (!isWin) {
					isWin = true;
					typeLine = 4;
					for (let k = 1; k < 5; k++) {
						if (i + k >= n || j - k < 0 || squares[(i + k) * n + j - k] !== squares[i * n + j]) {
							isWin = false;
							typeLine = 0;
							break;
						}
					}
				}

				if (isWin) {
					post = { x: i, y: j, type: typeLine };
				}
			}
	}

	if (isWin) {
		const line = findLineWinner(post, n);
		return { winner: squares[post.x * n + post.y], line: line };
	}

	return null;
};
