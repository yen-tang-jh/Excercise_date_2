import './styles.css';

const PLAYER_COLOR = {
	X: 'blue',
	O: 'pink',
};
const Square = ({ isWinning, onClick, value }) => {
	return (
		<button
			className={'square ' + (isWinning ? 'square-winning' : null)}
			onClick={onClick}
			style={{ color: PLAYER_COLOR[value] }}
		>
			{value}
		</button>
	);
};

export default Square;
