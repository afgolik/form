import styles from './app.module.css';
import { useState } from 'react';

export const Input = (props) => {
	const [error, setError] = useState(false);
	const onChange = ({target}) => {
		props.onChange(target.value);
		if (props.regExp.test(target.value)) {
			props.setInvalidFields({ ...props.inValidFields, [props.name]: false });
			setError(null);
		}
	}
	const onBlur = ({target}) => {
		if (!props.regExp.test(target.value)) {
			setError(true)
		}
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
			{error && <div className={styles.error}>{props.errorText}</div>}
		</>
	);
};
