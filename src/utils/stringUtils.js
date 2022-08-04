export default class stringUtils {
	static validateEmailAddress(email) {
		let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return email.match(emailRegex);
	}

	static validatePassword(password) {
		let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
		return password.match(passwordRegex);
	}
}
