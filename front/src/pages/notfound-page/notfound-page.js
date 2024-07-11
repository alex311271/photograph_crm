import styled from "styled-components"
import { ErrorPage } from "../../components/error-page/error-page"


const NotfoundPageContainer = ({className}) => {
	return (
		<ErrorPage className={className}>Страница ненайдена</ErrorPage>
	)
}

export const NotfoundPage = styled(NotfoundPageContainer)`
font-size: 20px;
`