//
// import styles from './App.module.css';
// import { useState } from 'react';
//
// export const Input = (props) => {
//     const [error, setError] = useState(false);
//
//     const onChange = ({ target }) => {
//         props.onChange(target.value);
//         if ((!props.regExp || props.regExp.test(target.value)) && (!props.validate || props.validate())) {
//             props.setInvalidFields({...props.inValidFields, [props.name]: false})
//             setError(false)
//         }
//     };
//     const onBlur = ({ target }) => {
//         if (props.regExp && !props.regExp.test(target.value)) {
//             setError(true);
//         } else if (props.validate && !props.validate()){
//             setError(true)
//         }
//     };
//     return (
//         <>
//             <input
//                 type={props.type}
//                 name={props.name}
//                 value={props.value}
//                 placeholder={props.placeholder}
//                 onChange={onChange}
//                 onBlur={onBlur}
//             />
//             {(props.isError || error) && <div className={styles.error}>{props.errorText}</div>}
//         </>
//     );
// };
