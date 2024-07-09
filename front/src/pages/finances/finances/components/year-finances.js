import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ContentCard, H2, Pagination, Search } from '../../../../components';
import { FinanceRow } from '.';
import { selectFinance, selectUserId } from '../../../../selectors';
import { debounce, getCurrentYearData, request } from '../../../../utils';
import { currentYear, PAGINATION_LIMIT } from '../../../../constants';
import { loadFinanceAsync, removeFinanceAsync, openModal, CLOSE_MODAL } from '../../../../actions';

export const YearFinances = () => {
	const userId = useSelector(selectUserId);
	const [finances, setFinances] = useState([]);
	const [shouldUpdateFinancesList, setShouldUpdateFinancesList] = useState(false);
	const dispatch = useDispatch();
	const finance = useSelector(selectFinance);
	const [lastPage, setLastPage] = useState(1);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(`/finances?userId=${userId}&search=${searchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`).then(({ data:  {finances, lastPage} }) => {
			setFinances(getCurrentYearData(finances, currentYear));
			setLastPage(lastPage);
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

	const navigate = useNavigate();

	const onEdit = (financeId) => {
		dispatch(loadFinanceAsync(financeId));
		navigate(`/finance/${financeId}`);
	};
	// const yearFinances = getCurrentYearData(finances, currentYear);

	const startDelaySearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({target}) => {<Search onChange={onSearch} searchPhrase={searchPhrase} placeholder="Поиск по имени" />
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<ContentCard width="600px">
			<H2>Расходы за год</H2>
			<Search onChange={onSearch} searchPhrase={searchPhrase} placeholder="Поиск по наименованию расхода" />
			{finances.map(({ id, date, expenseItem, sum }) => {
				return (
					<FinanceRow
						key={id}
						id={id}
						date={date}
						expenseItem={expenseItem}
						sum={sum}
						onFinanceRemove={() => onFinanceRemove(id)}
						onEdit={() => onEdit(id)}
						finance={finance}
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
