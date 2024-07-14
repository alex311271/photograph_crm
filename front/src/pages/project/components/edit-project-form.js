import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button, H2, FormError, InputRow } from '../../../components';
import { useResetForm } from '../../../hooks';
import { setProjectData } from '../../../actions';
import { selectProject } from '../../../selectors';
import { locationBooker, NAMES_TITLE } from '../../../constants';
import { request } from '../../../utils';

const projectFormSchema = yup.object().shape({
	client: yup.string(),
	dateShooting: yup.string(),
	shootingTime: yup.string(),
	durationShooting: yup.string(),
	bookingLocation: yup.string(),
	paymentLocation: yup.number(),
	costShooting: yup.number(),
	prepayment: yup.number(),
	calculation: yup.number(),
	date: yup.string(),
	projectCompleted: yup.string(),
	ownerId: yup.string(),
	clientId: yup.string(),
});

const EditProjectFormContainer = ({ className }) => {
	const project = useSelector(selectProject);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			client: project.client,
			dateShooting: project.dateShooting,
			shootingTime: project.shootingTime,
			durationShooting: project.durationShooting,
			bookingLocation: project.bookingLocation,
			paymentLocation: project.paymentLocation,
			costShooting: project.costShooting,
			prepayment: project.prepayment,
			calculation: project.calculation,
			date: project.date,
			projectCompleted: project.projectCompleted,
		},
		resolver: yupResolver(projectFormSchema),
	});
	const [serverError, setServerError] = useState(null);

	useResetForm(reset);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const onSubmit = ({
		client,
		dateShooting,
		shootingTime,
		durationShooting,
		bookingLocation,
		paymentLocation,
		costShooting,
		prepayment,
		calculation,
		date,
		projectCompleted,
	}) => {
		request(`/projects/${params.id}`, 'PATCH', {
				client,
				dateShooting,
				shootingTime,
				durationShooting,
				bookingLocation,
				paymentLocation,
				costShooting,
				prepayment,
				calculation,
				date,
				projectCompleted,
	}).then(({ error, data }) => {
		if (error) {
			setServerError(`Ошибка запроса ${error}`);
			return;
		}
		dispatch(setProjectData(data));
		navigate(`/project/${params.id}`);
	});
};

	const formError = errors?.name?.message || errors?.phone?.message;
	const errorMessage = formError || serverError;
	return (
		<div className={className}>
			<H2>Редактирование съёмки</H2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<InputRow rowName={NAMES_TITLE.CLIENT}>
					<Input
						type="text"
						width="400px"
						{...register('client', { onChange: () => setServerError(null) })}
					/>
				</InputRow>

				<InputRow rowName={NAMES_TITLE.DATE_SHOOTING}>
					<Input
						type="date"
						width="400px"
						{...register('dateShooting', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.SHOOTING_TIME}>
					<Input
						type="time"
						width="400px"
						{...register('shootingTime', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.DURATION_SHOOTING}>
					<Input
						type="text"
						width="400px"
						{...register('durationShooting', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.COST_SHOOTING}>
					<Input
						type="number"
						width="400px"
						{...register('costShooting', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.BOOKING_LOCATION}>
					<select
						{...register('bookingLocation', { onChange: () => setServerError(null) })}
					>
						{locationBooker.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.PAYMENT_LOCATION}>
					<Input
						type="number"
						width="400px"
						{...register('paymentLocation', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.PREPAYMENT}>
					<Input
						type="number"
						width="400px"
						{...register('prepayment', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.CALCULATION}>
					<Input
						type="number"
						width="400px"
						{...register('calculation', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.DEADLINE}>
					<Input
						type="date"
						placeholder="Срок отдачи материала..."
						width="400px"
						{...register('date', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<InputRow rowName={NAMES_TITLE.PROJECT_COMPLETED}>
					<Input
						type="date"
						width="400px"
						{...register('projectCompleted', { onChange: () => setServerError(null) })}
					/>
				</InputRow>
				<Button type="submit" disabled={!!formError} width="120px">
					Сохранить
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
		</div>
	);
};

export const EditProjectForm = styled(EditProjectFormContainer)`
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

	& select {
		width: 400px;
		height: 40px;
		font-size: 18px;
		margin-bottom: 10px;
		border: 1px solid #231c0a;
	}
`;
