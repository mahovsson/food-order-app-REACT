import { useEffect, useState } from 'react';

import classes from './AvaliableMeals.module.css';
import MealItem from './MealItem';
import Card from '../UI/Card';

const AvaliableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const fetchData = async () => {
		setIsLoading(true);
		let response = await fetch(
			'https://food-order-app-3b76f-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
		);

		if (!response.ok) {
			throw new Error('Something went wrong!!!');
		}

		let data = await response.json();
		let transformedData = [];

		for (const key in data) {
			transformedData.push({
				id: key,
				name: data[key].name,
				description: data[key].description,
				price: data[key].price,
			});
		}
		setMeals(transformedData);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData().catch((error) => {
			setIsLoading(false);
			setError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes['meal-loading']}>
				<p>Loading...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={classes.error}>
				<p>{error}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvaliableMeals;
