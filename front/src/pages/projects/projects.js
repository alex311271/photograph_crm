import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removeProjectAsync } from '../../actions';
import { selectUserId } from '../../selectors';
import { debounce, request } from '../../utils';
import { ProjectRow } from '../components';
import { ContentCard, H2, Search, Pagination } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';

const ProjectsContainer = ({ className }) => {

	const [projects, setProjects] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const userId = useSelector(selectUserId);
	const [shouldUpdateProjectList, setShouldUpdateProjectList] = useState(false);
	const [shouldSearch, setShouldSearch] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		request(`/projects?userId=${userId}&search=${searchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`).then(({ data: { projects, lastPage } }) => {
			setProjects(projects);
			setLastPage(lastPage)
		},
	);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ shouldUpdateProjectList, page, shouldSearch]);

	const onProjectRemove = (projectId) => {
		dispatch(openModal({
			text: 'Удалить съёмку?',
			onConfirm: () => {dispatch(removeProjectAsync(projectId),
				dispatch(CLOSE_MODAL),
				setShouldUpdateProjectList(!shouldUpdateProjectList))
				setPage(1)
			},
			onCancel: () => dispatch(CLOSE_MODAL)
		})
	);
	};

const startDelaySearch = useMemo(() => debounce(setShouldSearch, 2000), [])

const onSearch = ({target}) => {
	setSearchPhrase(target.value);
	startDelaySearch(!shouldSearch);
};

	return (
		<div className={className}>
			<ContentCard width="600px">
				<H2>Съёмки</H2>
				<Search onChange={onSearch} searchPhrase={searchPhrase} placeholder="Поиск по имени" />
				{projects.map(({ id, client, dateShooting, shootingTime }) => {
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
				{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
			</ContentCard>
		</div>
	);
};

export const Projects = styled(ProjectsContainer)`
	& .projects-list {
		margin-top: 40px;
	}
`;
