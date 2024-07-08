import styled from 'styled-components';

const InputRowContainer = ({ className, children, rowName }) => {
	return (
		<div className={className}>
			<label className="row-name">{rowName}</label>
			{children}
		</div>
	);
};

export const InputRow = styled(InputRowContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 700px;

	& .row-name {
		font-size: 20px;
		font-weight: 600;
	}
`;
