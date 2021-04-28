import classes from './Checkout.module.css';

const Checkout = (props) => {
	const orderHandler = (event) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={orderHandler}>
			<div className={classes.control}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' />
			</div>
			<div className={classes.control}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' />
			</div>
			<div className={classes.control}>
				<label htmlFor='postal_code'>Postal Code</label>
				<input type='text' id='postal_code' />
			</div>
			<div className={classes.control}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' />
			</div>
			<button>Confirm</button>
			<button type='button' onClick={props.onCancel}>
				Cancel
			</button>
		</form>
	);
};

export default Checkout;
