import styles from './App.module.css';
import {useState, useRef, useEffect} from 'react';
import { Input } from './input';

const emailValidate = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordValidate = /^(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
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
	const onRepeatPasswordChange = (value) => {
		setRepeatPassword(value);
	};
	const validateRepeatPassword = () => {
		return repeatPassword === password;
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
					placeholder='Введите email'
					onChange={onEmailChange}
					regExp={emailValidate}
					value={email}
					errorText='Неверный формат почты. Почта должна содержать символ @ и название домена. Пример правильной почты: user@email.ru'
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
				/>
				<Input
					type='text'
					name='password'
					value={password}
					placeholder='Придумайте пароль'
					onChange={onPasswordChange}
					regExp={passwordValidate}
					errorText='Пароль должен содержать минимум 8 символов: строчные и прописные латинские буквы, цифры. Пробелы изпользовать запрещено'
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
				/>
				<Input
					type={'text'}
					name={'repeatPassword'}
					value={repeatPassword}
					placeholder={'Повторите пароль'}
					onChange={onRepeatPasswordChange}
					errorText='Пароли не совпадают'
					validate={validateRepeatPassword}
					isError={repeatPasswordError}
					inValidFields={inValidFields}
					setInvalidFields={setInvalidFields}
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

