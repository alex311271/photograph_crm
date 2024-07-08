import styled from 'styled-components';

const H2Container = ({ children, className }) => (
	<h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Container)`
	font-size: 1.5rem;
	font-weight: 600;
	text-align: center;
	margin: ${({ margin = '10px 0' }) => margin};
`;
