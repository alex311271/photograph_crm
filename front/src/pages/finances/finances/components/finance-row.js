import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';

const FinanceRowContainer = ({
	className,
	id,
	date,
	expenseItem,
	sum,
	onFinanceRemove,
	onEdit,
	finance,
}) => {
	return (
		<div className={className}>
			<div className="date">{date}</div>
			<div className="expense-name">{expenseItem}</div>
			<div className="sum">{sum}</div>
			<div className="control-panel">
				<Icon id="fa-trash-o" onClick={onFinanceRemove} />
				<Link to={`/finance/${id}`}><Icon id="fa-arrow-right" margin="0 10px 0" /></Link>
			</div>
		</div>
	);
};

export const FinanceRow = styled(FinanceRowContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px auto;
	width: 500px;
	height: 40px;
	border: 1px solid #231c0a;
	border-radius: 5px;
	font-weight: 600;

	& .date {
		margin: 0 0 0 20px;
	}

	& .control-panel {
		display: flex;
		justify-content: space-around;
		width: 100px;
	}
`;
