import { useContext, useState, Fragment } from 'react';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			'https://food-order-app-3b76f-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartRemoveHandler.bind(null, item.id)}
					onAdd={cartAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button
				className={classes['button--alt']}
				onClick={props.onCloseCart}
			>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onCancel={props.onCloseCart}
					onConfirm={submitOrderHandler}
				/>
			)}
			{!isCheckout && modalActions}
		</Fragment>
	);

	const isSubmitingModalContent = <p>Sending order data ...</p>;

	const didSubmitModalContent = (
		<Fragment>
			<p>Successfully sent the order</p>
			<p>You will be contacted when order is ready</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onCloseCart}>
					Close
				</button>
			</div>
		</Fragment>
	);

	return (
		<Modal onClose={props.onCloseCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmitingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
