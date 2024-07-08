import { request } from '../utils';
import { setClientData } from './set-client-data';

export const loadClientAsync = (clientId) => (dispatch) => {
	request(`/clients/${clientId}`).then((clientData) => {
		if(clientData.data){
			dispatch(setClientData(clientData.data));
	};
	return clientData;
	});
};
