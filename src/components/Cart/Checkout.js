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

	const {
		value: inputStreet,
		inputValueIsValid: inputStreetIsValid,
		hasError: inputStreetHasError,
		inputChangeHandler: streetChangeHandler,
		inputBlurHandler: streetBlurHandler,
		inputReset: streetReset,
	} = useInput((value) => value.trim() !== '');

	const {
		value: inputPostal,
		inputValueIsValid: inputPostalIsValid,
		hasError: inputPostalHasError,
		inputChangeHandler: postalChangeHandler,
		inputBlurHandler: postalBlurHandler,
		inputReset: postalReset,
	} = useInput((value) => value.trim() !== '' && value.length === 5);

	const {
		value: inputCity,
		inputValueIsValid: inputCityIsValid,
		hasError: inputCityHasError,
		inputChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		inputReset: cityReset,
	} = useInput((value) => value.trim() !== '');

	let formIsValid = false;

	if (
		inputNameIsValid &&
		inputStreetIsValid &&
		inputPostalIsValid &&
		inputCityIsValid
	) {
		formIsValid = true;
	}

	const confirmHandler = (event) => {
		event.preventDefault();

		nameReset();
		streetReset();
		postalReset();
		cityReset();
	};

	const nameInputClasses = `${classes.control} ${
		inputNameHasError ? classes.invalid : ''
	}`;

	const streetInputClasses = `${classes.control} ${
		inputStreetHasError ? classes.invalid : ''
	}`;

	const postalInputClasses = `${classes.control} ${
		inputPostalHasError ? classes.invalid : ''
	}`;

	const cityInputClasses = `${classes.control} ${
		inputCityHasError ? classes.invalid : ''
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
					<p className={classes.error}>Please enter valid name</p>
				)}
			</div>
			<div className={streetInputClasses}>
				<label htmlFor='street'>Street</label>
				<input
					type='text'
					id='street'
					value={inputStreet}
					onChange={streetChangeHandler}
					onBlur={streetBlurHandler}
				/>
				{inputStreetHasError && (
					<p className={classes.error}>Please enter valid street</p>
				)}
			</div>
			<div className={postalInputClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input
					type='text'
					id='postal'
					value={inputPostal}
					onChange={postalChangeHandler}
					onBlur={postalBlurHandler}
				/>
				{inputPostalHasError && (
					<p className={classes.error}>Please enter valid postal code</p>
				)}
			</div>
			<div className={cityInputClasses}>
				<label htmlFor='city'>City</label>
				<input
					type='text'
					id='city'
					value={inputCity}
					onChange={cityChangeHandler}
					onBlur={cityBlurHandler}
				/>
				{inputCityHasError && (
					<p className={classes.error}>Please enter valid city name</p>
				)}
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
