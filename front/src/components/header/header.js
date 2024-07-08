import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ControlPanel, Logo } from './components';
import { selectUserId } from '../../selectors';
import { useSelector } from 'react-redux';

const LinkPanel = styled.div`
	display: flex;
	width: 600px;
	justify-content: space-between;
	align-items: end;
	color: #fff;
	margin: 0px auto;
`;

const HeaderContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	return (
		<header className={className}>
			<Logo />
			{userId ? (
				<LinkPanel>
					<Link to={'/clients'}>Контакты</Link>
					{/* <Link to={'/client'}>Добавить контакт</Link> */}
					<Link to={'/projects'}>Съёмки</Link>
					<Link to={'/finances'}>Финансы</Link>
				</LinkPanel>
			) : null}

			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1200px;
	height: 120px;
	padding: 20px;
	background-color: #3b2f10;
	box-shadow: 0px 0px 15px #231c0a;
`;
