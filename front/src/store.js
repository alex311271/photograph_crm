import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	usersReducer,
	clientReducer,
	clientsReducer,
	projectReducer,
	projectsReducer,
	financeReducer,
	financesReducer,
} from './reducers/index';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	client: clientReducer,
	clients: clientsReducer,
	project: projectReducer,
	projects: projectsReducer,
	finance: financeReducer,
	finances: financesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
