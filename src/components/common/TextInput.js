import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextInput = props => {
	const [showError, setShowError] = useState(props.shouldShowError(false, false));

	const onEdit = event => {
		setShowError(props.shouldShowError(true, true));
		props.onChange(event);
	};

	const toggleFocus = () => {
		setShowError(props.shouldShowError(false, true));
	};

	let textClass = props.className ? props.className : '';

	if (showError) textClass += ' has-error';

	return (
		<div className={textClass}>
			<div className="formLabel" htmlFor={props.name}>
				{props.label}
			</div>
			<input
				type="email"
				name={props.name}
				placeholder={props.placeholder}
				value={props.value}
				onChange={onEdit}
				onBlur={toggleFocus}
				onFocus={toggleFocus}
			/>

			{showError && <div className="fieldError" dangerouslySetInnerHTML={{ __html: props.error }}></div>}
		</div>
	);
};

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	className: PropTypes.string,
	shouldShowError: PropTypes.func
};

export default TextInput;
