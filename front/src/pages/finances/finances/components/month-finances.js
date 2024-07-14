import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FinanceRow } from '.';
import { selectUserId } from '../../../../selectors';
import { removeFinanceAsync, openModal, CLOSE_MODAL } from '../../../../actions';
import styled from 'styled-components';
import { debounce, getEndDate, getStartDate,  request } from '../../../../utils';
import { ContentCard, H2, Button, Search, Pagination } from '../../../../components';
import { currentMonth, currentYear, PAGINATION_LIMIT } from '../../../../constants';

const MonthFinancesContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const [finances, setFinances] = useState([]);
	const [shouldUpdateFinancesList, setShouldUpdateFinancesList] = useState(false);
	const [lastPage, setLastPage] = useState(1);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const dispatch = useDispatch();
	const startDate = getStartDate(currentYear, currentMonth, "01");
	const endDate = getEndDate(currentYear, currentMonth)


	useEffect(() => {
		request(`/finances?userId=${userId}&startDate=${startDate}&endDate=${endDate}&search=${searchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`).then(({ data: { finances, lastPage } }) => {
			setFinances(finances);
			setLastPage(lastPage)
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request, shouldUpdateFinancesList, shouldSearch, page]);

	const onFinanceRemove = (id) => {
		dispatch(openModal({
			text: 'Удалить расход?',
			onConfirm: () => {dispatch(removeFinanceAsync(id),
				dispatch(CLOSE_MODAL),
				setShouldUpdateFinancesList(!shouldUpdateFinancesList))
			},
			onCancel: () => dispatch(CLOSE_MODAL)
		})
	);
	};

	const startDelaySearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({target}) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<ContentCard width="600px">
			<H2 >Расходы за месяц</H2>
			<Search onChange={onSearch} searchPhrase={searchPhrase} placeholder="Поиск по имени" />
			{finances.map(({ id, date, expenseItem, sum }) => {
				return (
					<FinanceRow
						id={id}
						key={id}
						date={date}
						expenseItem={expenseItem}
						sum={sum}
						onFinanceRemove={() => onFinanceRemove(id)}
					/>
				);
			})}
			<Link to={'/finance/add'}>
				<Button width="170px">Добавить расход</Button>
			</Link>
			{lastPage > 1 && <Pagination margin="20px 0 10px" page={page} lastPage={lastPage} setPage={setPage} />}
		</ContentCard>
	);
};

export const MonthFinances = styled(MonthFinancesContainer)`

`;
