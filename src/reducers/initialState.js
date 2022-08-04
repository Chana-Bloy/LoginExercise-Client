/**
 * Initial state - creates the initial objects to be passed as states to our reducers.
 * Will be passed to store function
 */
export default {
	login: {
		token: '',
		personalDetails: {
			name: '',
			Team: '',
			joinedAt: '',
			avatar: ''
		}
	}
};
