import styled from "styled-components"
import { H2 } from "../h2/h2"
import { Button } from "../button/button"
import { useSelector } from "react-redux"
import { selectModalIsOpen, selectModalOnCancel, selectModalOnConfirm, selectModalText } from "../../selectors"


const ModalContainer = ({className}) => {

	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen)

	if(!isOpen){
		return
	}

	return(
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<H2>{text}</H2>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>Да</Button>
					<Button width="120px" onClick={onCancel}>Отмена</Button>
				</div>
			</div>
		</div>
	)
}

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 50;

& .overlay{
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}

& .box{
	position: relative;
	top: 50%;
	transform: translate(0, -50%);
	width: 350px;
	margin: 0 auto;
	padding: 40px;
	border: solid 2px #fff;
	border-radius: 5px;
	z-index: 55;
	color: #fff;
}

& .buttons{
	display: flex;
	justify-content: space-between;
	width: 250px;
	margin: 0 auto;
}
`