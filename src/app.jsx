import styles from './app.module.css';
import { useState, useRef } from 'react';
import { validationEmail, validationPassword } from './utils/validations';
import { Input } from './input';
import { sendData } from './utils/submitting-form';

const initialValidFields = {
	email: true,
	password: true,
	// repeatPassword: true,
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
		// submitButtonRef.current.focus();
		return false;
	};
	const onEmailChange = (value) => {
		setEmail(value);
	};
	const onPasswordChange = (value) => {
		setPassword(value);
	};
	// const onPasswordBlur = ({ target }) => {
	// 	if (!validationPassword.test(target.value)) {
	// 		setInvalidFields({ ...inValidFields, password: true });
	// 		setPasswordError(
	// 			'Пароль должен содержать минимум 8 символов: строчные и прописные латинские буквы, цифры. Пробелы изпользовать запрещено',
	// 		);
	// 	}
	// 	if (repeatPassword) {
	// 		const obj = {
	// 			target: {
	// 				value: repeatPassword,
	// 			},
	// 		};
	// 		onRepeatPasswordChange(obj);
	// 		onRepeatPasswordBlur(obj);
	// 	}
	// };
	// const onRepeatPasswordChange = ({ target }) => {
	// 	setRepeatPassword(target.value);
	// 	if (target.value === password) {
	// 		setInvalidFields({ ...inValidFields, repeatPassword: false });
	// 		setRepeatPasswordError(null);
	// 	}
	// };
	// const onRepeatPasswordBlur = ({ target }) => {
	// 	if (target.value !== password) {
	// 		setInvalidFields({ ...inValidFields, repeatPassword: true });
	// 		setRepeatPasswordError('Пароли не совпадают');
	// 	}
	// };

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
					regExp={validationEmail}
					errorText='Неверный формат почты. Почта должна содержать символ @ и название домена. Пример правильной почты: user@email.ru'
					onChange={onEmailChange}
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
				/>
				<Input
					type='password'
					name='password'
					value={password}
					placeholder='Придумайте пароль'
					regExp={validationPassword}
					errorText='Пароль должен содержать минимум 8 символов: строчные и прописные латинские буквы, цифры. Пробелы изпользовать запрещено'
					onChange={onPasswordChange}
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
				/>
				{/*<Input*/}
				{/*	type='password'*/}
				{/*	name='repeatPassword'*/}
				{/*	value={repeatPassword}*/}
				{/*	placeholder='Повторите пароль'*/}
				{/*regExp={emailValidate}*/}
				{/*	errorText='Пароли не совпадают'*/}
				{/*	onChange={onRepeatPasswordChange}*/}
				{/*	onBlur={onRepeatPasswordBlur}*/}
				{/*	inValidFields={inValidFields}*/}
				{/*	setInvalidFields={setInvalidFields}*/}
				{/*/>*/}
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
