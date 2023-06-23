import React from 'react';
import OrderPlacedSuccesfully from '../../assets/OrderPlacedSuccesfully.png';
import styles from './OrderPlaced.module.css';
function OrderPlaced(props) {
  const { history } = props;

  const redirectToHomepage = () => {
    history.push('/');
  };
  return (
    <div className={styles.orderPlaced}>
      <div className={styles.tickIcon}>
        <img src={OrderPlacedSuccesfully} alt="order-placed-tick" />
      </div>
      <div className={styles.orderPlacedSuccessfullyText}> Order Placed Successfully !</div>
      <div className={styles.goToHomepage} role="button" tabIndex={0} onClick={redirectToHomepage}>
        Go to Home
      </div>
    </div>
  );
}

export default OrderPlaced;
