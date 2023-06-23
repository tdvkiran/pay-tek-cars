import React from 'react';
import styles from './PaymentSuccess.module.css';
import PaymentSuccessImage from '../../assets/PaymentSuccessful21.png';
function PaymentSuccess() {
  return (
    <div className={styles.paymentContainer}>
      <div className={styles.successImage}>
        <img src={PaymentSuccessImage} alt="payment - success" />
      </div>
      <div className={styles.paymentSuccessfulText}>Payment Successful</div>
    </div>
  );
}

export default PaymentSuccess;
