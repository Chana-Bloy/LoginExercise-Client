import utils from '../../utils/utils';

export async function login(request) {
	//let url = 'https://private-052d6-testapi4528.apiary-mock.com/authenticate';
	let url = 'https://localhost:5001/api/user/login';

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	})
		.then(response => utils.handleResponse(response))
		.then(([responseOk, data]) => {
			if (responseOk) {
				if (data.length) return data[0];
				return 'User not exist!';
			}
		})
		.catch(error => {
			throw error;
		});
}
export default {
	login
};
