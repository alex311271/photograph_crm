import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams, useMatch } from 'react-router-dom';
import { loadClientAsync } from '../../actions';
import { DataLine } from '../components/data-line.js';
import { NAMES_TITLE } from '../../constants';
import { Button, ErrorPage } from '../../components';
import { selectClient } from '../../selectors';
import { EditClientForm } from './components/edit-client-form.js';

const ClientContainer = ({ className }) => {
	const client = useSelector(selectClient);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/client/:id/edit');

	useEffect(() => {
		dispatch(loadClientAsync(params.id));
	}, [dispatch, params.id, isEditing]);

	return client.id === '' ? (<ErrorPage>Такая запись несуществует</ErrorPage>) : (
		<div className={className}>
			{isEditing ? (
				<EditClientForm client={client} />
			) : (
				<div className="client-card">
					<DataLine nameData={NAMES_TITLE.CLIENT_NAME} data={client.name} />
					<DataLine nameData={NAMES_TITLE.CLIENT_PHONE} data={client.phone} />
					<DataLine nameData={NAMES_TITLE.CLIENT_EMAIL} data={client.email} />
					<DataLine nameData={NAMES_TITLE.CLIENT_BIRTHDAY} data={client.birthday} />
					<DataLine
						nameData={NAMES_TITLE.CLIENT_TELEGRAM}
						data={`https://t.me/${client.telegram}`}
					/>
					<DataLine
						nameData={NAMES_TITLE.CLIENT_WHATSAPP}
						data={`https://wa.me/${client.WhatsApp}`}
					/>
					<div className="buttons">
						<Link to={`/client/${params.id}/edit`}>
							<Button width={'150px'}>Редактировать</Button>
						</Link>
						<Link to={`/project`}>
							<Button width={'180px'} margin={'0 10px'}>
								Добавить съёмку
							</Button>
						</Link>
						<Link to={`/client/projects/${params.id}`}>
							<Button width={'150px'}>Съёмки</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export const Client = styled(ClientContainer)`
	& .client-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 135px auto;
		padding: 35px 100px;
		width: 800px;
		height: 480px;
		border: 2px solid #231c0a;
		border-radius: 10px;

	& .buttons{
	margin-top: 40px;
	display: flex;
	width: 500px;
	justify-content: space-between;
	}
`;
