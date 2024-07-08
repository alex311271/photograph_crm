import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { server } from '../../../bff';
import { Input, Button, H2, FormError } from '../../../components';
import { useResetForm } from '../../../hooks';
import { setClientData } from '../../../actions';
import { selectClient } from '../../../selectors';
import { request } from '../../../utils';

const clientFormSchema = yup.object().shape({
	name: yup.string().required('Заполните поле ФИО'),
	phone: yup.string().required('Заполните поле телефон'),
	birthday: yup.string(),
	email: yup.string(),
	telegram: yup.string(),
	WhatsApp: yup.string(),
});

const EditClientFormContainer = ({ className }) => {
	const client = useSelector(selectClient);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: client.name,
			phone: client.phone,
			birthday: client.birthday,
			email: client.email,
			telegram: client.telegram,
			WhatsApp: client.WhatsApp,
		},
		resolver: yupResolver(clientFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	useResetForm(reset);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const onSubmit = ({ name, phone, birthday, email, telegram, WhatsApp }) => {
		request(`/clients/${params.id}`, 'PATCH', {name, phone, birthday, email, telegram, WhatsApp})
			.then(({ error, data }) => {
				if (error) {
					setServerError(`Ошибка запроса ${error}`);
					return;
				}
				dispatch(setClientData(data));
				navigate(`/client/${params.id}`);
			});
	};
	const formError = errors?.name?.message || errors?.phone?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<H2>Редактирование контакта</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="ФИО"
					width="400px"
					{...register('name', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="text"
					placeholder="Телефон..."
					width="400px"
					{...register('phone', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="date"
					placeholder="День рождения..."
					width="400px"
					{...register('birthday', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="text"
					placeholder="Email..."
					width="400px"
					{...register('email', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="text"
					placeholder="Telegram..."
					width="400px"
					{...register('telegram', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="text"
					placeholder="WhatsApp..."
					width="400px"
					{...register('WhatsApp', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Сохранить
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
		</div>
	);
};

export const EditClientForm = styled(EditClientFormContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 60px auto;
	color: #231c0a;
	padding: 0 20px 20px;
	border: 2px solid #231c0a;
	border-radius: 5px;
	justify-content: center;
	width: 600px;

	& > form {
		color: #231c0a;
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
