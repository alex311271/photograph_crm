import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams, useMatch } from 'react-router-dom';
import { loadProjectAsync } from '../../actions/index.js';
import { DataLine } from '../components/data-line.js';
import { NAMES_TITLE } from '../../constants/index.js';
import { Button, ErrorPage, H2 } from '../../components/index.js';
import { selectProject } from '../../selectors/index.js';
import { EditProjectForm } from '../project/components/edit-project-form';

const ProjectContainer = ({ className }) => {
	const project = useSelector(selectProject);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/project/:id/edit');

	useEffect(() => {
		dispatch(loadProjectAsync(params.id));
	}, [dispatch, params.id, isEditing]);



	return project.id === '' ? (<ErrorPage>Такая запись не существует</ErrorPage>) : (
		<div className={className}>
			{isEditing ? (
				<EditProjectForm project={project} />
			) : (
				<div className="project-card">
					<H2>Съёмка</H2>
					<DataLine nameData={NAMES_TITLE.CLIENT_NAME} data={project.client} />
					<DataLine nameData={NAMES_TITLE.DATE_SHOOTING} date={project.dateShooting} />
					<DataLine nameData={NAMES_TITLE.SHOOTING_TIME} data={project.shootingTime} />
					<DataLine
						nameData={NAMES_TITLE.DURATION_SHOOTING}
						data={project.durationShooting}
						unitsName={'ч'}
					/>
					<DataLine
						nameData={NAMES_TITLE.COST_SHOOTING}
						data={project.costShooting}
						unitsName={'руб'}
					/>
					<DataLine
						nameData={NAMES_TITLE.BOOKING_LOCATION}
						data={project.bookingLocation}
					/>
					<DataLine
						nameData={NAMES_TITLE.PAYMENT_LOCATION}
						data={project.paymentLocation}
						unitsName={'руб'}
					/>
					<DataLine
						nameData={NAMES_TITLE.PREPAYMENT}
						data={project.prepayment}
						unitsName={'руб'}
					/>
					<DataLine
						nameData={NAMES_TITLE.CALCULATION}
						data={project.calculation}
						unitsName={'руб'}
					/>
					<DataLine nameData={NAMES_TITLE.DEADLINE} data={project.date} />
					<DataLine	nameData={NAMES_TITLE.PROJECT_COMPLETED} data={project.projectCompleted} />

					<Link to={`/project/${project.id}/edit`}>
						<Button width={'150px'}>Редактировать</Button>
					</Link>
				</div>
			)}
		</div>
	);
};
export const Project = styled(ProjectContainer)`
	& .project-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 135px auto;
		padding: 40px 40px;
		width: 600px;
		border: 2px solid #231c0a;
		border-radius: 10px;
	}
`;
