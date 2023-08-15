import styles from './app.module.css';
import { useState, useRef } from 'react';
import {validationEmail, validationPassword} from "./validations";
import {Input} from "./input";

const initialValidFields = {
	email: true,
	password: true,
	repeatPassword: true,
};
const sendData = (formData) => {
	console.log(formData);
};
export const App = () => {
	const [inValidFields, setInvalidFields] = useState(initialValidFields);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const getInValid = () => {
		for (let key in inValidFields) {
			if (inValidFields[key]) {
				return true;
			}
		}
		submitButtonRef.current.focus();
		return false;
	};
	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		if (validationEmail.test(target.value)) {
			setInvalidFields({ ...inValidFields, email: false });
			setEmailError(null);
		}
	};
	const onEmailBlur = ({ target }) => {
		if (!validationEmail.test(target.value)) {
			setEmailError(
				'Неверный формат почты. Почта должна содержать символ @ и название домена. Пример правильной почты: user@email.ru',
			);
		}
	};
	const onPasswordChange = ({ target }) => {
		if (validationPassword.test(target.value)) {
			setInvalidFields({ ...inValidFields, password: false });
			setPasswordError(null);
		}
		setPassword(target.value);
	};
	const onPasswordBlur = ({ target }) => {
		if (!validationPassword.test(target.value)) {
			setInvalidFields({ ...inValidFields, password: true });
			setPasswordError(
				'Пароль должен содержать минимум 8 символов: строчные и прописные латинские буквы, цифры. Пробелы изпользовать запрещено',
			);
		}
		if (repeatPassword) {
			const obj = {
				target: {
					value: repeatPassword,
				},
			};
			onRepeatPasswordChange(obj);
			onRepeatPasswordBlur(obj);
		}
	};
	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);
		if (target.value === password) {
			setInvalidFields({ ...inValidFields, repeatPassword: false });
			setRepeatPasswordError(null);
		}
	};
	const onRepeatPasswordBlur = ({ target }) => {
		if (target.value !== password) {
			setInvalidFields({ ...inValidFields, repeatPassword: true });
			setRepeatPasswordError('Пароли не совпадают');
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!getInValid()) {
			sendData({ email, password, repeatPassword });
			setEmail('');
			setPassword('');
			setRepeatPassword('');
			setInvalidFields(initialValidFields);
		}
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Input
					type='email'
					name='email'
					value={email}
					placeholder='Введите email'
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>

				<Input
					type='password'
					name='password'
					value={password}
					placeholder='Придумайте пароль'
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<Input
					type='password'
					name='repeatPassword'
					value={repeatPassword}
					placeholder='Повторите пароль'
					onChange={onRepeatPasswordChange}
					onBlur={onRepeatPasswordBlur}
				/>
				{repeatPasswordError && (
					<div className={styles.error}>{repeatPasswordError}</div>
				)}
				<button
					type='submit'
					ref={submitButtonRef}
					className={getInValid() ? styles.disabled : ''}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
