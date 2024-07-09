import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FinanceRow } from '.';
import { selectUserId } from '../../../../selectors';
import { removeFinanceAsync, openModal, CLOSE_MODAL } from '../../../../actions';
import styled from 'styled-components';
import { debounce, getCurrentMonthData, request } from '../../../../utils';
import { ContentCard, H2, Button, Search, Pagination } from '../../../../components';
import { currentMonth, PAGINATION_LIMIT } from '../../../../constants';

const MonthFinancesContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const [finances, setFinances] = useState([]);
	const [shouldUpdateFinancesList, setShouldUpdateFinancesList] = useState(false);
	const [lastPage, setLastPage] = useState(1);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		request(`/finances?userId=${userId}&search=${searchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`).then(({ data: { finances } }) => {
			setFinances(finances);
			setLastPage(lastPage)
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request, shouldUpdateFinancesList, shouldSearch]);

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


	const monthFinances = getCurrentMonthData(finances, currentMonth);

	const startDelaySearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({target}) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<ContentCard width="600px">
			<H2 >Расходы за месяц</H2>
			<Search onChange={onSearch} searchPhrase={searchPhrase} placeholder="Поиск по имени" />
			{monthFinances.map(({ id, date, expenseItem, sum }) => {
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
			{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
		</ContentCard>
	);
};

export const MonthFinances = styled(MonthFinancesContainer)`

`;
