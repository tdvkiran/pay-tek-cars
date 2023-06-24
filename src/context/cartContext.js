import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    return storedCartItems || [];
  });
  // const [cartItems, setCartItems] = useState([]);
  const calculateTotalQuantity = () => cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

  // const [totalCartQuantity, setTotalCartQuantity] = useState(calculateTotalQuantity());

  const [totalCartQuantity, setTotalCartQuantity] = useState(() => {
    const storedTotalQuantity = localStorage.getItem('totalCartQuantity');
    return storedTotalQuantity ? parseInt(storedTotalQuantity) : calculateTotalQuantity();
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setTotalCartQuantity(calculateTotalQuantity());
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('totalCartQuantity', totalCartQuantity.toString());
  }, [totalCartQuantity]);

  useEffect(() => {
    setTotalCartQuantity(calculateTotalQuantity());
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalCartQuantity, setTotalCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
