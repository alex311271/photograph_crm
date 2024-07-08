import styled from 'styled-components';
import { H2 } from '../../components';

const DataLineContainer = ({ className, nameData, data, unitsName, date }) => {
	return (
		<div className={className}>
			<H2> {nameData} </H2>
			<div className="data-block">
				<div className="date">{date}</div>
				<div className="dataName">{data}</div>
				<div className="units-measurement">{unitsName}</div>
			</div>
		</div>
	);
};

export const DataLine = styled(DataLineContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	height: 30px;
	padding: 5px 0;
	margin-bottom: 20px;
	justify-content: space-between;
	color: #231c0a;

	& .data-block {
		display: flex;
		font-size: 20px;
		color: #231c0a;
		align-items: center;
		justify-content: end;
	}

	& .date {
		display: flex;
		color: #231c0a;
		margin-left: 10px;
	}

	& .units-measurement {
		display: flex;
		color: #231c0a;
		margin-left: 10px;
	}
`;
