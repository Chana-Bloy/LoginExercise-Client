import types from './types';

export const login = (userDetails) => ({ type: types.LOGIN, payload: userDetails});
export default {
	login
};