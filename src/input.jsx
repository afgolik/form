import styles from './app.module.css';
import { useState } from 'react';
import {validationEmail} from "./utils/validations";

export const Input = (props) => {
	const [error, setError] = useState(null);
	const onChange = ({target}) => {
		if (validationEmail.test(target.value)) {
			props.setInvalidFields({ ...props.inValidFields, [props.name]: false });
			setError(null);
		}
	}
	const onBlur = ({target}) => {
		if (!validationEmail.test(target.value)) setError(props.errorText)
	}
	return (
		<>
			<input
				type={props.type}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={onChange}
				onBlur={props.onBlur}
			/>
			{error && <div className={styles.error}>{props.errorText}</div>}
		</>
	);
};
