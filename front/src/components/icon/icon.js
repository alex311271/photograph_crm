import styled from 'styled-components';

const IconContainer = ({ className, id, onClick, inactive, ...props }) => (
	<div className={className} onClick={onClick} {...props}>
		<i className={`fa ${id}`}></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '16px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
`;
