import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button, H2, FormError, InputRow } from '../../components';
import { useResetForm } from '../../hooks';
import { setFinanceData } from '../../actions';
import { selectFinance } from '../../selectors';
import { request } from '../../utils';

const editFinanceFormSchema = yup.object().shape({
	date: yup.string(),
	expenseItem: yup.string(),
	sum: yup.number(),
});

const EditFinanceFormContainer =   ({ className }) => {
	const finance = useSelector(selectFinance);
	const dispatch = useDispatch();
	const params = useParams();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			date: finance.date,
			expenseItem: finance.expenseItem,
			sum: finance.sum,
		},
		resolver: yupResolver(editFinanceFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	useResetForm(reset);
	const navigate = useNavigate();

	const onSubmit = ({ date, expenseItem, sum }) => {
		request(`/finances/${params.id}`, 'PATCH', {date, expenseItem, sum}).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
				return;
			}
			dispatch(setFinanceData(data));
			navigate(`/finances`);
		});
	};
	const formError = errors?.date?.message || errors?.expenseItem?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<H2 margin={'0 0 20px 0'}>Редактирование расхода</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputRow rowName={'Дата'}>
					<Input
						type="date"
						width="300px"
						{...register('date', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={'Статья расхода'}>
					<Input
						type="text"
						width="300px"
						{...register('expenseItem', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={'Сумма'}>
					<Input
						type="number"
						width="300px"
						{...register('sum', { onChange: () => setServerError(null) })}
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

export const EditFinanceForm = styled(EditFinanceFormContainer)`
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

	& .buttons {
		display: flex;
		justify-content: space-between;
		width: 250px;
	}
`;
