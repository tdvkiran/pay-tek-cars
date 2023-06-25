import React from 'react'
import OrderPlaced from '../OrderPlaced/OrderPlaced'

function PaymentAuthorised(props) {
    const textMessage = 'Payment Authorized ! Order is Processing.';
    const {history} = props;
  return (
    <OrderPlaced textMessage={textMessage} history={history}/>
  )
}

export default PaymentAuthorised;