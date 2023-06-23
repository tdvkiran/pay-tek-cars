import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';
import styles from './Navbar.module.css';
import CartLogo from '../../assets/CartLogo';

const Navbar = props => {
  const { history } = props;

  const { totalCartQuantity, setTotalCartQuantity } = useContext(CartContext);

  const handleGoToCart = () => {
    history.push('/cart');
  };
  const handleGoToHome = () => {
    history.push('/');
  };

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <div className={styles.swiggy_logo} onClick={handleGoToHome}>
          <img
            src="https://com-tekioncloud-cdms-global.s3.us-west-1.amazonaws.com/DMS/common/paytek.svg"
            alt="Paytek-Logo"
          ></img>
        </div>

        <div className={styles.cart_button_link} onClick={handleGoToCart}>
          <div className={styles.cart_logo}>
            <CartLogo />
            <span className={styles.cart_quantity}>{totalCartQuantity}</span>
          </div>
          <div className={styles.cart_text}>Cart</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
