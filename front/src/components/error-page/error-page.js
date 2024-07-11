import styled from "styled-components"
import { ContentCard } from "../content-card/content-card"
import { H2 } from "../h2/h2"


const ErrorPageContainer = ({className, children}) => {
	return (
		<div className={className}>
			<ContentCard width= "600px">
				<H2 className="h2">ОШИБКА</H2>
				<div className="error-text">{children}</div>
			</ContentCard>
		</div>
	)
}

export const ErrorPage = styled(ErrorPageContainer)`
& .h2 {
	color: red;
}

& .error-text{
	font-size: 20px;
}
`