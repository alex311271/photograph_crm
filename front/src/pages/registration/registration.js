import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Input, Button, H2, FormError } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserId } from '../../selectors';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 симвала')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверный пароль. Минимум 6 символов')
		.max(20, 'Неверный пароль. Максимум 20 символов'),
	passcheck: yup
		.string()
		.required('Повтоорите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request("/register", "POST", { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (userId) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	margin: 60px auto;
	flex-direction: column;
	align-items: center;
	padding: 0 20px 20px;
	border: 2px solid #3b2f10;
	justify-content: center;
	width: 300px;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
