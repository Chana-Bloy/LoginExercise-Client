import { combineReducers } from 'redux';
import login from './loginReducer';

/**
 * Root reducer - combines all reducers to one reducer to be passed to store function
 */
const rootReducer = combineReducers({
	login
});

export default rootReducer;
