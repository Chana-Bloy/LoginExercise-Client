import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/personalDetailsCard.css';
import { useSelector } from 'react-redux';
import { loginSelectors } from '../../state/login';
import { loadProjectsData } from '../../state/info/operations';
import Table from './Table';

const ProjectsListCard = () => {
	const token = useSelector(loginSelectors.token);
	const [projects, setProjects] = useState([]);

	const columns = useMemo(
		() => [
			{
				Header: 'Projects',
				columns: [
					{
						Header: 'Name',
						accessor: 'name'
					},
					{
						Header: 'Score',
						accessor: 'score',
						Cell: ({ cell: { value } }) => {
							return <div className={value < 70 ? 'lowScore' : value > 90 ? 'highScore' : ''}>{value}</div>;
						}
					},
					{
						Header: 'Bugs Count',
						accessor: 'bugsCount'
					},
					{
						Header: 'Duration In Days',
						accessor: 'durationInDays'
					},
					{
						Header: 'Id',
						accessor: 'id'
					},
					{
						Header: 'Made Dadeline',
						accessor: 'madeDadeline',
						Cell: ({ cell: { value } }) => {
							return <div>{value ? 'V' : 'X'}</div>;
						}
					}
				]
			}
		],
		[]
	);

	const loadProjects = async () => {
		let projectsData = await loadProjectsData(token);
		setProjects(projectsData);
	};

	useEffect(() => {
		loadProjects();
	}, []);

	return (
		<div>
			<Table columns={columns} data={projects} />
		</div>
	);
};
export default ProjectsListCard;
