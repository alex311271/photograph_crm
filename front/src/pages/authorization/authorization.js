import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Input, Button, H2, FormError } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserId } from '../../selectors';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
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
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', {login, password}).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (userId) {
		return <Navigate to="/projects" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
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
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
			<StyledLink to="/register">Регистрация</StyledLink>
		</div>
	);
};

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
	width: 300px;
`;

export const Authorization = styled(AuthorizationContainer)`
	margin: 60px auto;
	display: flex;
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
