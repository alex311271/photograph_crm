import { request } from '../utils';
import { setClientData } from './set-client-data';

export const removeClientAsync = (clientId) => (dispatch) => {
	request(`/clients/${clientId}`, 'DELETE').then((clientData) => {
			dispatch(setClientData(clientData.data))
	});
};