import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, H2, FormError, InputRow } from '../../../components';
import { useResetForm } from '../../../hooks';
import { setClientData } from '../../../actions';
import { NAMES_TITLE } from '../../../constants';
import { request } from '../../../utils';

const clientFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните поле ФИО')
		.min(1, 'Неверно заполнено поле ФИО. Минимум 1 симвала')
		.max(100, 'Неверно заполнено поле ФИО. Максимум 100 символов'),
	phone: yup
		.string()
		.required('Заполните поле телефон')
		.matches(
			/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
			'Номер телефона должен содержать только цифры и смволы + ( ) -',
		),
	birthday: yup.string(),
	email: yup.string(),
	telegram: yup.string(),
	WhatsApp: yup.string(),
});

const ClientFormContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			birthday: '',
			email: '',
			telegram: '',
			WhatsApp: '',
		},
		resolver: yupResolver(clientFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	useResetForm(reset);
	const navigate = useNavigate();

	const onSubmit = ({ name, phone, birthday, email, telegram, WhatsApp }) => {
		request('/clients', 'POST', {name, phone, birthday, email, telegram, WhatsApp})
			.then(({ error, data }) => {
				if (error) {
					setServerError(`Ошибка запроса ${error}`);
					return;
				}
				dispatch(setClientData(data));
				navigate(`/client/${data._id}`);
			});
	};
	const formError = errors?.name?.message || errors?.phone?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<H2>Добавление контакта</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputRow rowName={NAMES_TITLE.CLIENT}>
					<Input
						type="text"
						width="300px"
						{...register('name', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.CLIENT_PHONE}>
					<Input
						type="text"
						width="300px"
						{...register('phone', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.CLIENT_BIRTHDAY}>
					<Input
						type="date"
						width="300px"
						{...register('birthday', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.CLIENT_EMAIL}>
					<Input
						type="email"
						width="300px"
						{...register('email', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName="Telegram user name">
					<Input
						type="text"
						width="300px"
						{...register('telegram', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName="Номер телефона WhatsApp">
					<Input
						type="text"
						width="300px"
						{...register('WhatsApp', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<Button type="submit" disabled={!!formError} width="120px" margin="40px 0 0 0">
					Сохранить
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
		</div>
	);
};

export const ClientForm = styled(ClientFormContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 60px auto;
	color: #231c0a;
	padding: 20px 20px;
	border: 2px solid #231c0a;
	border-radius: 5px;
	justify-content: center;
	width: 800px;

	& > form {
		color: #231c0a;
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
