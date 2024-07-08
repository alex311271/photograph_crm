import { request } from '../utils';
import { setProjectData } from './set-project-data';

export const removeProjectAsync = (projectId) => (dispatch) => {
	request(`/projects/${projectId}`, 'DELETE').then((projectData) => {
			dispatch(setProjectData(projectData.data))
	});
};