import './styles.css';

const Square = ({ isWinning, onClick, value }) => {
	const color = value === 'X' ? 'blue' : 'pink';
	return (
		<button
			className={'square ' + (isWinning ? 'square--winning' : null)}
			onClick={onClick}
			style={{ color: color }}
		>
			{value}
		</button>
	);
};

export default Square;
