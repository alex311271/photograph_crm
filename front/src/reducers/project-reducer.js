import { ACTION_TYPE } from '../actions';

const initialProjectState = {
	id: '',
	client: '',
	dateShooting: '',
	shootingTime: '',
	durationShooting: '',
	bookingLocation: '',
	paymentLocation: '',
	costShooting: '',
	prepayment: '',
	calculation: '',
	deadline: '',
	projectCompleted: '',
	ownerId: '',
	clientId: '',
};

export const projectReducer = (state = initialProjectState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_PROJECT_DATA:
			return initialProjectState;
		default:
			return state;
	}
};
