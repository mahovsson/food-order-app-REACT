import { Fragment } from 'react';
import mealsImage from '../../assets/images/meals.jpeg';
import classes from './Header.module.css';
import HeaderCartButton from '../Layout/HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
