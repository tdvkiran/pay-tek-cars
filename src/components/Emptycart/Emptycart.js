import React from 'react';
import styles from './Emptycart.module.css';
import EmptyCartImage from '../../assets/Emptycart.png';

function Emptycart(props) {
  const { history } = props;
  const redirectToAddCars = () => {
    history.push('./cars');
  };
  return (
    <div className={styles.emptyCartContainer}>
      <div className={styles.emptyCartImage}>
        <div className={styles.emptyCartText}>Your Cart is Empty !</div>
        <img src={EmptyCartImage} alt="empty-cart" />
        <div className={styles.goToCarsPage} onClick={redirectToAddCars}>
          Add Cars
        </div>
      </div>
    </div>
  );
}

export default Emptycart;
