import { useEffect, useMemo, useState } from 'react';
import { ClientRow } from '../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { openModal, CLOSE_MODAL, removeClientAsync } from '../../actions';
import { Button, ContentCard, H2, Search, Pagination } from '../../components';
import { debounce, request } from '../../utils';
import { PAGINATION_LIMIT } from '../../constants';

const ClientsContainer = ({ className }) => {

	const [lastPage, setLastPage] = useState(1);
	const [page, setPage] = useState(1);
	const [clients, setClients] = useState([]);
	const userId = useSelector(selectUserId);
	const [shouldUpdateClientList, setShouldUpdateClientList] = useState(false);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const dispatch = useDispatch();
;

	useEffect(() => {
		request(`/clients?userId=${userId}&search=${searchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`).then(({ data: { clients, lastPage } }) => {
			setClients(clients);
			setLastPage(lastPage);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldUpdateClientList, page, shouldSearch]);

	const onClientRemove = (clientId) => {
		dispatch(openModal({
				text: 'Удалить контакт?',
				onConfirm: () => {dispatch(removeClientAsync(clientId),
					dispatch(CLOSE_MODAL),
					setShouldUpdateClientList(!shouldUpdateClientList))
					setPage(1)
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
		<div className={className}>
			<div className="clients-list">
				<ContentCard width='700px'>
					<H2>Контакты</H2>
					<Search onChange={onSearch} searchPhrase={searchPhrase} placeholder="Поиск по имени" />
					{clients.map(({ id, name, phone, telegram, WhatsApp }) => {

							return (
								<ClientRow
									key={id}
									id={id}
									name={name}
									phone={phone}
									telegram={telegram}
									WhatsApp={WhatsApp}
									onClientRemove={() => onClientRemove(id)}
								/>
							);
						}
					)}
					<Link to={'/client'}>
					<Button width="170px">Добавить контакт</Button>
				</Link>
					{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
					</ContentCard>
			</div>
		</div>
	);
};

export const Clients = styled(ClientsContainer)`

	& .clients-list {
		margin-top: 40px;
	}
`;
