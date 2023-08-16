import styles from './app.module.css';
import { useState } from 'react';

export const Input = (props) => {
	const [error, setError] = useState(false);
	const onChange = ({ target }) => {
		console.log(props.isError)
		if (
			(!props.regExp && !props.validate) ||
			(props.regExp && props.regExp.test(target.value)) ||
			(props.validate && props.validate(target.value))
		) {
			props.setInvalidFields({ ...props.inValidFields, [props.name]: false });
			setError(false);
		} else if (
			(props.regExp && !props.regExp.test(target.value)) ||
			(props.validate && !props.validate(target.value))
		) {
			props.setInvalidFields({ ...props.inValidFields, [props.name]: true });
		}
		props.onChange(target.value);
	};
	const onBlur = ({ target }) => {
		if (
			(props.regExp && !props.regExp.test(target.value)) ||
			(props.validate && !props.validate(target.value))
		) {
			setError(true);
		}
	};
	function isValid(value){
		return ((!props.regExp || props.regExp.test(value)))
	}
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
