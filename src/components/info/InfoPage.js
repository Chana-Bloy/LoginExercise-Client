import React from 'react';
import { withRouter } from 'react-router-dom';
import PersonalDetailsCard from './PersonalDetailsCard';
import ProjectsListCard from './ProjectsListCard';

const InfoPage = () => {
	return (
		<>
			<h2>Information</h2>
			<PersonalDetailsCard />
			<ProjectsListCard />
		</>
	);
};
export default withRouter(InfoPage);
