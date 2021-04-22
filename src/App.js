import { useState } from 'react';

import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const [cartShow, setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  };

  const closeCartHandler = () => {
    setCartIsShow(false);
  };

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} />
      {cartShow && <Cart onCloseCart={closeCartHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
