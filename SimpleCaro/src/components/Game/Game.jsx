import { useState, useEffect } from 'react';

import './styles.css';
import Board from '../Board/Board';
import { calculateWinner } from '../../helpers/calculateWinner';

const Game = () => {
	const [stepNumber, setStepNumber] = useState(0);
	const [isXNext, setIsXNext] = useState(true);
	const [isDesc, setIsDesc] = useState(false);
	const [sizeOfBoard, setSizeOfBoard] = useState(5);
	const [inputSize, setInputSize] = useState('');
	const [roadHistory, setRoadHistory] = useState([
		{
			squares: Array(sizeOfBoard * sizeOfBoard).fill(null),
			lastMove: null,
		},
	]);

	const handleClick = (i) => {
		const his = roadHistory.slice(0, stepNumber + 1);
		const current = his[his.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares, sizeOfBoard) || squares[i]) {
			return;
		}
		squares[i] = isXNext ? 'X' : 'O';

		setRoadHistory(
			his.concat([
				{
					squares: squares,
					lastMove: [i % sizeOfBoard, Math.floor(i / sizeOfBoard)],
				},
			])
		);

		setStepNumber(his.length);
		setIsXNext(!isXNext);
	};

	const handleChangeSize = (e) => {
		setInputSize(e.target.value);
	};

	const handleSubmitChangeSize = () => {
		setSizeOfBoard(inputSize);
		setStepNumber(0);
		setIsXNext(true);
	};

	useEffect(() => {
		setRoadHistory((history) => [
			{
				squares: Array(sizeOfBoard * sizeOfBoard).fill(null),
				lastMove: null,
			},
		]);
	}, [sizeOfBoard]);

	const jumpTo = (step) => {
		setStepNumber(step);
		setIsXNext(step % 2 === 0);
	};

	const sortHistory = () => {
		setIsDesc(!isDesc);
	};

	const current = roadHistory[stepNumber];
	const winner = calculateWinner(current.squares, sizeOfBoard);

	const moves = roadHistory.map((step, move) => {
		const desc = move
			? 'Go to move #' + move + ' (' + roadHistory[move].lastMove.toString() + ')'
			: 'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{move === stepNumber ? <b>{desc}</b> : desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = 'Winner: ' + winner.winner;
	} else if (!current.squares.includes(null)) {
		status = 'Result: Draw';
	} else {
		status = 'Next player: ' + (isXNext ? 'X' : 'O');
	}

	return (
		<div className='game'>
			<div className='game-board'>
				<Board
					winningSquares={winner ? winner.line : []}
					squares={current.squares}
					onClick={(i) => handleClick(i)}
					size={sizeOfBoard}
				/>
			</div>
			<div className='game-info'>
				<b>Choose board size:</b> &nbsp;
				<input type='number' name='size' style={{ width: 35 }} autoFocus onChange={handleChangeSize} />
				&nbsp;
				<button onClick={handleSubmitChangeSize}>OK</button>
				<br />
				<br />
				<div>
					<b>{status}</b>
				</div>
				<br />
				<span>
					<label className='switch' onMouseUp={sortHistory}>
						<input type='checkbox' />
						<span className='slider round'></span>
					</label>
					&nbsp; Sort by: {isDesc ? 'Ascending' : 'Descending'}
				</span>
				<ol>{isDesc ? moves.reverse() : moves}</ol>
			</div>
		</div>
	);
};

export default Game;
