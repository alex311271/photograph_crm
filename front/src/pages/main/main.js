import styled from "styled-components"
import { ContentCard, H2 } from "../../components"
import { Link } from "react-router-dom"

const MainContainer = ({className}) => {
	return(
		<div className={className}>
			<ContentCard width="600px" padding="10px 10px 20px 10px">
				<H2>Photograph CRM</H2>
				<p>Простая система в помощь фотографу</p>
				<p>Здесь вы можете сохранять контакты своих клиентов </p>
				<p>а также информацию о предстоящих съёмках</p>
				<p>Также вы можете заносить сюда расходы </p>
				<p>связанные со съёмками, поступления оплаты от клиентов</p>
				<p>и оценить финансовый результат за текущий год.</p>
				<p></p>
				<p>Для начала работы с ситемой необходимо</p>
				<p> <Link className="link" to={'/login'}>ВОЙТИ</Link> или <Link className="link" to={'/register'}>ЗАРЕГИСТРИРОВАТЬСЯ</Link></p>
			</ContentCard>
		</div>
	)
}

export const Main = styled(MainContainer)`
	font-size: 20px;
	line-height: 35px;

	& .link {
	text-decoration: underline;
	}
`