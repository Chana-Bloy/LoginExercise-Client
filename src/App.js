import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import pagesRoutes from './utils/pagesRoutes';
import ExerciseSuspense from './components/lazyLoad/ExerciseSuspense';

const LoginPage = React.lazy(() => import('./components/login/LoginPage'));
const InfoPage = React.lazy(() => import('./components/info/InfoPage'));
const LoginPageSuspense = ExerciseSuspense(LoginPage);
const InfoPageSuspense = ExerciseSuspense(InfoPage);

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path={pagesRoutes.home}>
						<Redirect to={pagesRoutes.login} />
					</Route>
					<Route path={pagesRoutes.login} component={props => <LoginPageSuspense {...props} />} />
					<Route path={pagesRoutes.info} component={props => <InfoPageSuspense {...props} />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
