import { request } from "../../utils";
import { setClientData } from "../../actions";

export const addClientAsync = (name, phone, birthday, email, telegram, WhatsApp, ownerId) => (dispatch) => {
	request(`/clients`, "POST", {
			name,
			phone,
			birthday,
			email,
			telegram,
			WhatsApp,
			owner_id: ownerId,
	}).then((clientData) => {
	dispatch(setClientData(clientData.data));
	})
}