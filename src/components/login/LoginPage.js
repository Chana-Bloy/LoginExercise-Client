import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PasswordInput from '../common/PasswordInput';
import TextInput from '../common/TextInput';
import '../../styles/loginPageStyle.css';
import stringUtils from '../../utils/stringUtils';
import { loginActions } from '../../state/login';
import { login } from '../../state/login/operations';
import pagesRoutes from '../../utils/pagesRoutes';

const LoginPage = props => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [user, setUser] = useState({ email: '', password: '' });
	const [errors, setErrors] = useState();
	const [generalError, setGeneralError] = useState();

	useEffect(() => {
		validateUserDetails();
	}, [user]);

	const updateUserState = event => {
		const field = event.target.name;
		let userData = Object.assign({}, user);
		userData[field] = event.target.value;

		setUser({ email: userData.email, password: userData.password });
	};

	const validateUserDetails = () => {
		let currentErrors = {};

		// Validate password
		if (user.password.length == 0) {
			currentErrors.password = 'Please enter your password.';
		} else if (!stringUtils.validatePassword(user.password)) {
			currentErrors.password =
				"That password  doesn't look right.It should be with Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.";
		}

		// Validate email
		if (user.email.length == 0) {
			currentErrors.email = 'Please enter your email.';
		} else if (!stringUtils.validateEmailAddress(user.email)) {
			currentErrors.email = "That email address doesn't look right. Please&nbsp;try&nbsp;again.";
		}

		setErrors(currentErrors);

		let isValidData = !currentErrors.email && !currentErrors.password;
		setIsValid(isValidData);
	};
	const onChange = event => {
		updateUserState(event);
	};

	const redirectToInfoPage = () => {
		const { history } = props;
		history.push(pagesRoutes.info);
	};
	const onSubmit = async () => {
		setIsLoading(true);
		let result = await login({ email: user.email, password: user.password });
		if (result.token) {
			dispatch(loginActions.login(result));
			redirectToInfoPage();
		} else {
			setGeneralError(result);
			setIsValid(true);
			setUser({ email: '', password: '' });
		}
		setIsLoading(false);
	};

	const showPasswordError = (isEdit, isFocus) => {
		let hasContent = user?.password?.length > 0;
		let isValid = !(errors?.password && errors?.password.length);

		if (isValid || isEdit) return false;
		return (!hasContent && !isFocus) || hasContent;
	};

	const showEmailError = (isEdit, isFocus) => {
		let hasContent = user?.email?.length > 0;
		let isValid = !(errors?.email && errors?.email.length);

		if (isValid || isEdit) return false;

		return (!hasContent && !isFocus) || hasContent;
	};
	return (
		<form id="loginForm">
			<h3>Login</h3>
			<TextInput
				name="email"
				label="Email"
				className="loginFormField"
				value={user?.email}
				onChange={onChange}
				shouldShowError={showEmailError}
				error={errors?.email}
			/>

			<PasswordInput
				name="password"
				label="Password"
				className="loginFormField passwordFormField"
				value={user?.password}
				onChange={onChange}
				shouldShowError={showPasswordError}
				error={errors?.password}
			/>

			<div className="loginSubmitBtnPosition">
				<div tabIndex="3" id="loginSubmitBtn" className="loginSubmitBtn" onClick={onSubmit} disabled={!isValid}>
					{isLoading && <div className="linePreloader"></div>}
					<span>{isLoading ? 'Please wait' : 'Login'}</span>
				</div>
			</div>
			{generalError && <h3 className="generalError">{generalError}</h3>}
		</form>
	);
};

export default LoginPage;
