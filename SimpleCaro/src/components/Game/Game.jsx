import { useState, useEffect } from 'react';

import './styles.css';
import Board from '../Board/Board';
import { calculateWinner } from '../../helpers/calculateWinner';

const Game = () => {
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isDesc, setIsDesc] = useState(false);
	const [size, setSize] = useState(5);
	const [inputSize, setInputSize] = useState('');
	const [history, setHistory] = useState([
		{
			squares: Array(size * size).fill(null),
			lastMove: null,
		},
	]);

	const handleClick = (i) => {
		const his = history.slice(0, stepNumber + 1);
		const current = his[his.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares, size) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(
			his.concat([
				{
					squares: squares,
					lastMove: [i % size, Math.floor(i / size)],
				},
			])
		);

		setStepNumber(his.length);
		setXIsNext(!xIsNext);
	};

	const handleChangeSize = (e) => {
		setInputSize(e.target.value);
	};

	const handleSubmitChangeSize = () => {
		setSize((size) => (size = inputSize));
		setStepNumber(0);
		setXIsNext(true);
	};

	useEffect(() => {
		setHistory((history) => [
			{
				squares: Array(size * size).fill(null),
				lastMove: null,
			},
		]);
	}, [size]);

	const jumpTo = (step) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};

	const sortHistory = () => {
		setIsDesc(!isDesc);
	};

	const current = history[stepNumber];
	const winner = calculateWinner(current.squares, size);

	const moves = history.map((step, move) => {
		const desc = move ? 'Go to move #' + move + ' (' + history[move].lastMove.toString() + ')' : 'Go to game start';
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
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	console.log(current.squares);

	return (
		<div className='game'>
			<div className='game-board'>
				<Board
					winningSquares={winner ? winner.line : []}
					squares={current.squares}
					onClick={(i) => handleClick(i)}
					size={size}
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
