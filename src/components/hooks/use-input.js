import { useState } from 'react';

const useInput = (validateValue) => {
	const [inputValue, setInputValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const inputValueIsValid = validateValue(inputValue);
	const hasError = !inputValueIsValid && isTouched;

	const inputChangeHandler = (event) => {
		setInputValue(event.target.value);
	};

	const inputBlurHandler = (event) => {
		setIsTouched(true);
	};

	const inputReset = () => {
		setInputValue('');
		setIsTouched(false);
	};
	return {
		value: inputValue,
		inputValueIsValid,
		hasError,
		inputChangeHandler,
		inputBlurHandler,
		inputReset,
	};
};

export default useInput;
