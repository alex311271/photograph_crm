import { ACTION_TYPE } from './action-type';

export const setClientData = (clientData) => ({
	type: ACTION_TYPE.SET_CLIENT_DATA,
	payload: clientData,
});
