import styles from "./app.module.css";
import {useState} from "react";

export const Input = (props) => {
    const [error, setError] = useState(null)
	return (
		<>
			<input
				type={props.type}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
            {error && <div className={styles.error}>{error}</div>}
		</>
	);
};
