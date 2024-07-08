import styled from 'styled-components';
import { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	padding: 10px;
	margin: 0 0 10px;
	font-size: 18px;
	border: 1px solid #231c0a;
`;
