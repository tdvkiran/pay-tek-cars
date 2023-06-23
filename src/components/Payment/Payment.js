import React, { useCallback, useEffect, useState } from 'react';
// import SDK from 'pages/SDK';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import styles from './Payment.module.css';
function Payment(props) {
  const {
    successCallBack,
    failureCallBack,
    onProgressCallBack,
    onSdkLoadCallBack,
    onTransactionLockCallBack,
    totalAmount,
  } = props;
  const [transactionToken, setTransactionToken] = useState('');

  const getTransactionToken = async () => {
    axios
      .post(
        'https://tst-tpay-sdk.tekion.xyz/api/tpay-sdk-api/p/v1/transactions/initiate',
        {
          amount: totalAmount * 100,
          currency: 'USD',
          idempotencyKey: uuidv4(),
          notes: 'test-notes',
          clientOrderId: 'client-order-id-1',
          surchargeDisabled: true,
          metadata: {
            key1: 'value1',
          },
          enablePaymentModes: [],
          disablePaymentModes: [],
        },
        {
          headers: {
            'x-client-id': 'tpay_oBuYibDweO',
            'x-client-secret': 'cskstg_2ZZsu7Xh9yJ2cGg5cXQZ314LJe5DGj2naJLGv+sz',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(
        response => {
          const token = _.get(response, 'data.data.transactionToken');
          setTransactionToken(token);
        },
        error => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getTransactionToken();
  }, []);
  return (
    <div className={styles.paymentContainer}>
      {/* <SDK
        transactionToken={transactionToken}
        successCallBack={successCallBack}
        failureCallBack={failureCallBack}
        onProgressCallBack={onProgressCallBack}
        onSdkLoadCallBack={onSdkLoadCallBack}
        onTransactionLockCallBack={onTransactionLockCallBack}
      /> */}
    </div>
  );
}

export default Payment;
