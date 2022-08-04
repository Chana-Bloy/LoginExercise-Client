import initialState from './initialState';
import loginTypes from '../state/login/types';

export default function loginReducer(state = initialState.login, action) {
	switch (action.type) {
		case loginTypes.LOGIN:
			return { ...state, token: action.payload.token, personalDetails: action.payload.personalDetails };
		default:
			return state;
	}
}
