import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Modal } from './components';
import {
	Authorization,
	Client,
	ClientForm,
	Clients,
	Registration,
	Projects,
	Project,
	ProjectForm,
	ClientProjects,
	Finances,
	MonthFinances,
	YearFinances,
	FinanceForm,
	EditFinanceForm,
	Finance,
	Main
} from './pages';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';

const { default: styled } = require('styled-components');

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1200px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #ffe9ca;
`;

const Content = styled.div`
	padding: 120px 0;
`;

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				userId: currentUserData.userId,
			}),
		);
	}, [dispatch]);
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/login" element={<Authorization />}></Route>
					<Route path="/register" element={<Registration />}></Route>
					<Route path="/clients" element={<Clients />}></Route>
					<Route path="/client/:id" element={<Client />}></Route>
					<Route path="/client" element={<ClientForm />}></Route>
					<Route path="/client/:id/edit" element={<Client />}></Route>
					<Route path="/projects" element={<Projects />}></Route>
					<Route path="/project/:id" element={<Project />}></Route>
					<Route path="/project" element={<ProjectForm />}></Route>
					<Route path="/project/:id/edit" element={<Project />}></Route>
					<Route path="/client/projects/:id" element={<ClientProjects />}></Route>
					<Route path="/finances" element={<Finances />}></Route>
					<Route path="/finances/month" element={<MonthFinances />}></Route>
					<Route path="/finances/year" element={<YearFinances />}></Route>
					<Route path="/finance/add" element={<FinanceForm />}></Route>
					<Route path="/finance/:id" element={<Finance/>}></Route>
					<Route path="/finance/:id/edit" element={<EditFinanceForm/>}></Route>
					<Route path="*" element={<div>Error</div>}></Route>
				</Routes>
			</Content>
			<Footer />
			<Modal/>
		</AppColumn>
	);
};
