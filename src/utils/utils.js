import React from 'react';
import moment from 'moment';

/**
 * Class with common functions
 */
export default class utils {
	/**
	 * Parse response status and content according to response type
	 * To be used in fetch flows
	 * @param {object} response
	 */
	static handleResponse(response) {
		let contentType = response.headers.get('content-type');

		if (contentType && contentType.indexOf('application/json') !== -1) {
			return Promise.all([response.ok, response.json(), response.status, response.statusText]);
		} else {
			return Promise.all([response.ok, response.text(), response.status, response.statusText]);
		}
	}

	static shortDate(date) {
		if (date && moment(date).isValid()) {
			date = new Date(date);
			return moment(new Date(date)).format('M/D/YYYY');
		}
		return date;
	}
}
