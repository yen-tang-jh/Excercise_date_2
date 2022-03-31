import './styles.css';
import Square from '../Square/Square';

const Board = ({ winningSquares, squares, onClick, size }) => {
	const renderSquare = (i) => {
		return (
			<Square
				key={i}
				isWinning={winningSquares.includes(i) ? true : false}
				value={squares[i]}
				onClick={() => onClick(i)}
			/>
		);
	};

	const renderRow = (n, num) => {
		let row = [];
		for (let i = 0; i < n; i++) {
			row.push(renderSquare(n * num + i));
		}
		return row;
	};
	const renderBoard = (n) => {
		let board = [];
		for (let i = 0; i < n; i++) {
			board.push(
				<div key={i} className='board-row'>
					{renderRow(n, i)}
				</div>
			);
		}
		return board;
	};

	const board = renderBoard(size);
	return <div>{board}</div>;
};

export default Board;
