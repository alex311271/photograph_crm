import styled from 'styled-components';
import { Icon } from '../../components';
import { Link } from 'react-router-dom';

const ClientRowContainer = ({
	className,
	id,
	name,
	phone,
	telegram,
	WhatsApp,
	onClientRemove,
}) => {
	return (
		<div className={className}>
			<div className="data-item item-name">
				<div className="client-name">{name}</div>
			</div>

			<div className="data-item item-phone">
				<Icon id="fa-phone" margin="0 10px 0" />
				<div className="phone-number">{phone}</div>
			</div>

			<div className="data-item item-telegram">
				<a href={`https://t.me/${telegram}`}>
					<Icon id="fa-telegram" margin="0 10px 0" />
				</a>
			</div>
			<div className="data-item item-whatsapp">
				<a href={`https://wa.me/${WhatsApp}`}>
					<Icon id="fa-whatsapp" margin="0 10px 0" />
				</a>
			</div>
			<div className="control-panel">
				<Icon id="fa-trash-o" onClick={onClientRemove} />
				<Link to={`/client/${id}`}>
					<Icon id="fa-arrow-right" margin="0 10px 0" />
				</Link>
			</div>
		</div>
	);
};

export const ClientRow = styled(ClientRowContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px auto;
	width: 600px;
	height: 40px;
	border: 1px solid #231c0a;
	border-radius: 5px;

	& .data-item {
		display: flex;
		align-items: center;
		margin: 0 20px;
		width: 30px;
		font-weight: 600;
	}

	& .item-name {
		width: 100px;
	}

	& .item-phone {
		width: 200px;
	}

	& .control-panel {
		display: flex;
		justify-content: center;
		width: 100px;
	}
`;
