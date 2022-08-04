import { createStore} from 'redux';
import rootReducer from '../reducers';

/**
 * Create the redux store using the root reducer, initial state, and any required middlewares
 * @param {object} initialState
 */

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState);
}
