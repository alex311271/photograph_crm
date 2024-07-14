import styled from 'styled-components';
import { currentYear, currentMonth } from '../../constants';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, H2, Icon } from '../../components';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { DataLine } from '../components/data-line';
import { getCurrentMonthData, getCurrentYearData, getEndDate, getStartDate, request } from '../../utils';

const FinancesContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const [finances, setFinances] = useState([])
	const [errorMessage, setErrorMessage] = useState(null);
	const userId = useSelector(selectUserId);
	const startDate = getStartDate();
	const endDate = getEndDate()

	useEffect(() => {
		Promise.all([request(`/projects?userId=${userId}`), request(`/finances?userId=${userId}&startDate=${startDate}&endDate=${endDate}`)]).then(
			([
				{
					data: { projects },
				},
				{
					data: { finances },
				},
			]) => {
				if (projects.error || finances.error) {
					setErrorMessage(projects.error || finances.error);
					return;
				}
				setProjects(projects);
				setFinances(finances);
			},
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request]);

	const currentYearProjects = getCurrentYearData(projects, currentYear);

	const totalYear = currentYearProjects.reduce(
		(acc, { prepayment, calculation, paymentLocation }) => {
			return (acc += prepayment + calculation + paymentLocation);
		}, 0);

	console.log(projects, currentYearProjects)

	const currentMonthProjects = getCurrentMonthData(currentYearProjects, currentMonth);

	const totalMonth = currentMonthProjects.reduce(
		(acc, { prepayment, calculation, paymentLocation }) => {
			return (acc += prepayment + calculation + paymentLocation);
		},
		0,
	);

	const yearCustomerDebt = projects.reduce(
		(acc, { costShooting, calculation, prepayment }) => {
			return (acc += (costShooting - prepayment) - calculation);
		},
		0
	);

	const totalYearFinance = finances.reduce((acc, { sum }) => {
		return (acc += sum);
	}, 0);

	const currentMonthFinance = getCurrentMonthData(finances, currentMonth);

	const totalMonthFinance = currentMonthFinance.reduce((acc, { sum }) => {
		return (acc += sum);
	}, 0);

	const monthTotal = totalMonth - totalMonthFinance;

	const yearTotal = totalYear - totalYearFinance;

	return (
		<div className={className}>
			<H2 margin="20px 0 10px">Финансы за текущий год</H2>
			<div className="data-card">
				<H2>Поступления</H2>
				<DataLine
					nameData={'Поступление за текущий месяц месяц:'}
					data={totalMonth}
					unitsName={'руб.'}
				/>
				<DataLine
					nameData={'Поступление за текущий год:'}
					data={totalYear}
					unitsName={'руб.'}
				/>
				<DataLine
					nameData={'Задолженность клиентов:'}
					data={yearCustomerDebt}
					unitsName={'руб.'}
				/>
				<H2>Расходы</H2>
				<div className="line-block">
					<DataLine
						nameData={'Расход за год:'}
						data={totalYearFinance}
						unitsName={'руб.'}
					/>
					<Link to={`/finances/year`}>
						<Icon id={'fa-angle-double-right'} size={'24px'} margin={'2px 0 0 10px'} />
					</Link>
				</div>
				<div className="line-block">
					<DataLine
						nameData={'расход за месяц:'}
						data={totalMonthFinance}
						unitsName={'руб.'}
					/>
					<Link to={`/finances/month`}>
						<Icon id={'fa-angle-double-right'} size={'24px'} margin={'2px 0 0 10px'} />
					</Link>
				</div>
				<DataLine nameData={'Итого за месяц:'} data={monthTotal} unitsName={'руб.'} />
				<DataLine nameData={'Итого за год:'} data={yearTotal} unitsName={'руб.'} />
			</div>
			<Link to={'/finance/add'}>
				<Button width="170px">Добавить расход</Button>
			</Link>
		</div>
	);
};

export const Finances = styled(FinancesContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 40px auto;
	padding: 0px 40px 40px;
	width: 700px;
	border: 2px solid #231c0a;
	border-radius: 10px;

	& .line-block {
		display: flex;
	}
`;
