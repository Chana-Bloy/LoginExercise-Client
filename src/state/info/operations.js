import utils from '../../utils/utils';

export async function loadProjectsData(userToken) {
	// Alert application of new ajax call
	//	dispatch(actions.startFetchCampaigns());

	// let url = 'https://private-052d6-testapi4528.apiary-mock.com/info';
	let url = `https://localhost:5001/api/user/GetProjectsByUser`;

	return (
		fetch(url, {
			method: 'GET',
			headers: {
				UserToken: userToken
			}
		})
			// Handle response - parses the response status and content
			.then(response => utils.handleResponse(response))
			.then(([responseOk, data]) => {
				if (responseOk) {
					// Update the state with list of campaigns
					// Success sufix lets application know the ajax call is done
					//dispatch(actions.loadCampaignsSuccess(data.CampaignDetails));
					return data;
				} else {
					throw data;
				}
			})
			.catch(error => {
				// Alert application of ajax call endind (with error) and pass error forward
				//dispatch(ajaxOperations.ajaxCallError(error));
				throw error;
			})
	);
}

export default {
	loadProjectsData
};
