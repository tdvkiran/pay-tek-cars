import React from 'react';
import styles from './PaymentFailed.module.css';
import PaymentFailedImage from '../../assets/PaymentFailed.png';
function PaymentFailed(props) {
  const { handleRetryPayment } = props;
  const retryPayment = () => {
    handleRetryPayment();
  };
  return (
    <div className={styles.paymentContainer}>
      <div className={styles.successImage}>
        <img src={PaymentFailedImage} alt="payment - success" />
      </div>
      <div className={styles.paymentSuccessfulText}>Payment Failed</div>
      <div className={styles.retryButton} onClick={retryPayment} role="button" tabIndex={0}>
        Retry
      </div>
    </div>
  );
}

export default PaymentFailed;
