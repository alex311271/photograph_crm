import styled from "styled-components";
import { Icon } from "..";
import { Input } from "..";

const SearchContainer = ({ className, searchPhrase, onChange, placeholder}) => {
	return(
		<div className={className}>
			<Input value={searchPhrase} placeholder={placeholder} onChange={onChange} />
			<Icon id="fa-search" size="18px" inactive={true} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	margin: 40px auto 0;
	width: 340px;

	& > input {
		padding: 10px 30px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 9px;
	}
`;