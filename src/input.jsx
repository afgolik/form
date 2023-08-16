import styles from './app.module.css';
import { useState } from 'react';

export const Input = (props) => {
	const [error, setError] = useState(false);
	const isValid = (value) => {
		return (
			(!props.regExp || props.regExp.test(value)) &&
			(!props.validate || props.validate(value))
		);
	};
	const setInvalidFields = (value) => {
		props.setInvalidFields({ ...props.inValidFields, [props.name]: value });
	};
	const onChange = ({ target }) => {
		if (isValid(target.value)) {
			setInvalidFields(false);
			setError(false);
		} else {
			setInvalidFields(true);
		}
		props.onChange(target.value);
	};
	const onBlur = ({ target }) => {
		if (!isValid(target.value)) {
			setError(true);
		}
	};
	return (
		<>
			<input
				type={props.type}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{(props.isError === undefined ? error : props.isError) && (
				<div className={styles.error}>{props.errorText}</div>
			)}
		</>
	);
};
