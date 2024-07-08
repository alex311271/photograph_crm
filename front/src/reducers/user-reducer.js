import { ACTION_TYPE } from '../actions';

const initialUserState = {
	session: null,
	id: null,
	login: null,
	userId: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case ACTION_TYPE.LOGOUT: {
			return initialUserState;
		}
		default:
			return state;
	}
};
