import styles from './app.module.css';
import { useState, useRef } from 'react';
import { validationEmail, validationPassword } from './utils/validations';
import { Input } from './input';
import { sendData } from './utils/submitting-form';

const initialValidFields = {
	email: true,
	password: true,
	repeatPassword: true,
};

export const App = () => {
	const [inValidFields, setInvalidFields] = useState(initialValidFields);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [repeatPasswordError, setRepeatPasswordError] = useState(false);

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
		if (repeatPassword) setRepeatPasswordError(repeatPassword !== value);
	};

	// const onRepeatPasswordChange = ({ target }) => {
	// 	setRepeatPassword(target.value);
	// 	if (target.value === password) {
	// 		setInvalidFields({ ...inValidFields, repeatPassword: false });
	// 		setRepeatPasswordError(null);
	// 	}
	// };
	const onRepeatPasswordChange = (value) => {
		setRepeatPassword(value);
	};
	const validateRepeatPassword = () => {
		return repeatPassword === password;
	};
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
					type='text'
					name='password'
					value={password}
					placeholder='Придумайте пароль'
					regExp={validationPassword}
					errorText='Пароль должен содержать минимум 8 символов: строчные и прописные латинские буквы, цифры. Пробелы изпользовать запрещено'
					onChange={onPasswordChange}
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
				/>
				<Input
					type='text'
					name='repeatPassword'
					value={repeatPassword}
					placeholder='Повторите пароль'
					errorText='Пароли не совпадают'
					onChange={onRepeatPasswordChange}
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
					validate={validateRepeatPassword}
					isError={repeatPasswordError}
				/>
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
