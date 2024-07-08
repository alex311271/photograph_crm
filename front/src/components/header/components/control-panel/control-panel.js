import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../icon/icon';
import { Button } from '../../../button/button';
import { selectUserId, selectUserLogin } from '../../../../selectors';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../actions';

const StyledButton = styled.div`
	& :hover {
		cursor: pointer;
	}
`;

const LinkBlock = styled.div`
	display: flex;
	width: 60px;
	margin: 5px 0 0 0;
	justify-content: space-between;
`;

const UserName = styled.div`
	color: #fff;
	padding-top: 5px;
	text-align: center;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const login = useSelector(selectUserLogin);
	const userId = useSelector(selectUserId);

	return (
		<div className={className}>
			{!userId ? (
				// <Button width={'100px'}>
				// 	<Link to={'/login'}>Войти</Link>
				// </Button>
				null
			) : (
				<>
					<Icon id='fa fa-user-circle-o fa-2x' margin='0 0 0 15px' />
					<UserName>{login}</UserName>
					<LinkBlock>
						<StyledButton onClick={() => navigate(-1)}>
							<Icon id={'fa-angle-double-left fa-lg'} />
						</StyledButton>
						<Link to={'/login'} onClick={() => dispatch(logout())}>
							<Icon id={'fa-sign-out fa-lg'} />
						</Link>
					</LinkBlock>
				</>
			)}
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: center;

	& i {
		color: #fff;
	}
`;
