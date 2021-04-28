import classes from './Checkout.module.css';
import useInput from '../hooks/use-input';

const Checkout = (props) => {
	const {
		value: inputName,
		inputValueIsValid: inputNameIsValid,
		hasError: inputNameHasError,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		inputReset: nameReset,
	} = useInput((value) => value.trim() !== '');

	let formIsValid = false;

	if (inputNameIsValid) {
		formIsValid = true;
	}

	const confirmHandler = (event) => {
		event.preventDefault();

		nameReset();
	};

	const nameInputClasses = `${classes.control} ${
		inputNameHasError ? classes.invalid : ''
	}`;

	return (
		<form onSubmit={confirmHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					value={inputName}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
				/>
				{inputNameHasError && (
					<p className={classes.error}>Please insert valid name</p>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' />
			</div>
			<div className={classes.control}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' />
			</div>
			<div className={classes.control}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' />
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button
					disabled={!formIsValid}
					className={!formIsValid ? '' : classes.submit}
				>
					Confirm
				</button>
			</div>
		</form>
	);
};

export default Checkout;
