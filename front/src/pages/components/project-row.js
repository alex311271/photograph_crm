import styled from 'styled-components';
import { Icon } from '../../components';
import { Link } from 'react-router-dom';

const ProjectRowContainer = ({
	className,
	id,
	client,
	dateShooting,
	shootingTime,
	onProjectRemove,
}) => {
	return (
		<div className={className}>
			<div className="client-name">{client}</div>
			<div className="date-shooting">{dateShooting}</div>
			<div className="shooting-time">{shootingTime}</div>
			<div className="control-panel">
				<Icon id="fa-trash-o" onClick={onProjectRemove} />
				<Link to={`/project/${id}`}>
					<Icon id="fa-arrow-right" margin="0 10px 0" />
				</Link>
			</div>
		</div>
	);
};

export const ProjectRow = styled(ProjectRowContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px auto;
	width: 500px;
	height: 40px;
	border: 1px solid #231c0a;
	border-radius: 5px;
	font-weight: 600;

	& .client-name {
		margin: 0 0 0 20px;
	}

	& .control-panel {
		display: flex;
		justify-content: space-around;
		width: 100px;
	}
`;
