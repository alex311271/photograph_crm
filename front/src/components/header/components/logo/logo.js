import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoContainer = ({ className }) => (
	<Link className={className} to={'/'}>
		<i className="fa fa-camera-retro fa-5x"></i>
	</Link>
);

export const Logo = styled(LogoContainer)`
	& i {
		color: #fff;
	}

	
`;
