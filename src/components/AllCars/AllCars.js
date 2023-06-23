import React, { useContext, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { cartPopup } from '../../helpers/cartPopup';
import { CartContext } from '../../context/cartContext';
import styles from './AllCars.module.css';
import cars from '../../assets/carsData';

function AllCars({ history }) {
  const { cartItems, setCartItems, totalCartQuantity } = useContext(CartContext);
  const [cartItemsCounts, setCartItemsCounts] = useState(Array(cars.length + 1).fill(0));

  // useEffect(() => {
  //   // Retrieve cart items from local storage on component mount
  //   const storedCartItems = localStorage.getItem('cartItems');
  //   if (storedCartItems) {
  //     setCartItems(JSON.parse(storedCartItems));
  //   }
  // }, []);

  useEffect(() => {
    // Update local storage whenever cart items change
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // localStorage.setItem('totalCartQuantity', JSON.stringify(totalCartQuantity));

    // Update cart items counts
    const newCounts = Array(cars.length).fill(0);
    cartItems.forEach(item => {
      newCounts[item.id] = item.quantity;
    });
    setCartItemsCounts(newCounts);
  }, [cartItems]);

  const addToCartHandler = id => {
    const carToAdd = cars.find(car => car.id === id);
    const existingCartItem = cartItems.find(item => item.id === id);

    if (existingCartItem) {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...carToAdd, quantity: 1 }]);
    }

    setCartItemsCounts(prevCounts => {
      const newCounts = [...prevCounts];
      newCounts[id] += 1;
      return newCounts;
    });
  };

  const removeFromCart = id => {
    const existingCartItem = cartItems.find(item => item.id === id);

    if (existingCartItem && existingCartItem.quantity > 1) {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      );
    } else {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    setCartItemsCounts(prevCounts => {
      const newCounts = [...prevCounts];
      if (newCounts[id] > 0) {
        newCounts[id] -= 1;
      }
      return newCounts;
    });
  };
  const handleCartPopup = () => {
    history.push('/cart');
  };
  let totalCartPrice = 0;
  const getTotalAmount = () => {
    cartItems.forEach(car => {
      const numericPrice = parseFloat(car.price.replace(/[^0-9.-]+/g, ''));
      const totalPrice = numericPrice * car.quantity;
      totalCartPrice += totalPrice;
    });
    return `$${totalCartPrice.toLocaleString()}`;
  };

  return (
    <div className={styles.all_cars}>
      {cartItems &&
        cars.map((car, index) => (
          <div className={styles.car_container} key={index}>
            <div className={styles.car_image}>
              <img src={car.image} alt="car-image" />
            </div>
            <div className={styles.car_description}>
              <p>Make : {car.make}</p>
              <p>Model : {car.model}</p>
              <p>Price : {car.price}</p>
              <p>Year : {car.year}</p>
            </div>
            <div className={styles.add_to_cart}>
              {!cartItemsCounts[car.id] && (
                <button type="button" onClick={() => addToCartHandler(car.id)}>
                  Add to Cart
                </button>
              )}
              {cartItemsCounts[car.id] > 0 && (
                <div className={styles.addAndRemoveButton}>
                  <div
                    onClick={() => removeFromCart(car.id)}
                    className={styles.removeFromCart}
                    role="button"
                    tabIndex={0}
                  >
                    <RemoveIcon style={{ fontSize: 20 }} />
                  </div>
                  <div className={styles.itemsCount}>{cartItemsCounts[car.id]}</div>
                  <div onClick={() => addToCartHandler(car.id)} className={styles.addToCart} role="button" tabIndex={0}>
                    <AddIcon style={{ fontSize: 20 }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      {cartPopup(handleCartPopup, totalCartQuantity, getTotalAmount, styles)}
    </div>
  );
}
export default AllCars;
