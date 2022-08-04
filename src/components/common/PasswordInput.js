import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordInput = props => {
	const [showError, setShowError] = useState(false);

	const onEdit = event => {
		setShowError(props.shouldShowError(true));
		props.onChange(event);
	};

	const toggleFocus = () => {
		setShowError(props.shouldShowError(false, true));
	};

	let passwordClass = props.className ? props.className : '';

	if (showError) passwordClass += ' has-error';
	return (
		<div className={passwordClass}>
			<div className="formLabel" htmlFor={props.name}>
				{props.label}
			</div>

			<div className="password-wrapper">
				<input
					type={'password'}
					name={props.name}
					className="password-input"
					placeholder={props.placeholder}
					value={props.value}
					onChange={onEdit}
					onBlur={toggleFocus}
					onFocus={toggleFocus}
				/>
			</div>

			{showError && (
				<div className="fieldError">
					<span dangerouslySetInnerHTML={{ __html: props.error }}></span>
				</div>
			)}
		</div>
	);
};

PasswordInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	className: PropTypes.string,
	shouldShowError: PropTypes.func
};

export default PasswordInput;
