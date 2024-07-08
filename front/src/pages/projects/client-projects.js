import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ProjectRow } from '../components';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { useParams } from 'react-router-dom';
import { request } from '../../utils';

const ClientProjectsContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const userId = useSelector(selectUserId);
	const [shouldUpdateProjectList, setShouldUpdateProjectList] = useState(false);
	const params = useParams();

	useEffect(() => {
		request(`/projects?userId=${userId}`).then(({ data: { projects } }) => {
			setProjects(projects);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request, shouldUpdateProjectList]);

	const onProjectRemove = (projectId) => {
		request(`/projects/${projectId}`, 'DELETE').then(() => {
			setShouldUpdateProjectList(!shouldUpdateProjectList);
		});
	};

	const idClient = params.id;

	const clientProjects = projects.map(
		({ id, client, dateShooting, shootingTime, clientId }) => {
			if (clientId === idClient) {
				return { id, client, dateShooting, shootingTime };
			}
		},
	);

	console.log(projects, clientProjects)
	const filteredClientProjects = clientProjects.filter((item) => {
		return item !== undefined;
	});

	return (
		<div className={className}>
			<div className="projects-list">
				{filteredClientProjects.map(({ id, client, dateShooting, shootingTime }) => {
					return (
						<ProjectRow
							key={id}
							id={id}
							client={client}
							dateShooting={dateShooting}
							shootingTime={shootingTime}
							onProjectRemove={() => onProjectRemove(id)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const ClientProjects = styled(ClientProjectsContainer)`
	& .projects-list {
		margin-top: 40px;
	}
`;
