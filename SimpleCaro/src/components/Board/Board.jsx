import './styles.css';
import Square from '../Square/Square';

const Board = ({ winningSquares, squares, onClick, numOfLine }) => {
	const renderSquare = (currentPositionOfSquare) => {
		return (
			<Square
				key={currentPositionOfSquare}
				isWinning={winningSquares.includes(currentPositionOfSquare) ? true : false}
				value={squares[currentPositionOfSquare]}
				onClick={() => onClick(currentPositionOfSquare)}
			/>
		);
	};

	const renderRow = (numOfLine, lineIndex) => {
		let row = [];
		for (let i = 0; i < numOfLine; i++) {
			row.push(renderSquare(numOfLine * lineIndex + i));
		}
		return row;
	};
	const renderBoard = (numOfLine) => {
		const board = [];
		for (let i = 0; i < numOfLine; i++) {
			board.push(
				<div key={i} className='board-row'>
					{renderRow(numOfLine, i)}
				</div>
			);
		}
		return board;
	};

	const board = renderBoard(numOfLine);
	return <div>{board}</div>;
};

export default Board;
