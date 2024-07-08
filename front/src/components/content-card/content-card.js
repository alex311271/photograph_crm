import styled from 'styled-components';

const ContentCardContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const ContentCard = styled(ContentCardContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: ${({ margin = '40px auto' }) => margin};
	padding: ${({ padding = '10px 10px' }) => padding};
	width: ${({ width = '100%' }) => width};
	border: 2px solid #231c0a;
	border-radius: 10px;
`;
