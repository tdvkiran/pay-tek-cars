import React ,{useContext,useEffect}from 'react';
import OrderPlacedSuccesfully from '../../assets/OrderPlacedSuccesfully.png';
import PaymentInProgress from '../../assets/paymentInProgress.png'
import { CartContext } from '../../context/cartContext';
import styles from './OrderPlaced.module.css';
function OrderPlaced(props) {
  const { history ,textMessage} = props;

  const redirectToHomepage = () => {
    history.push('/');
  };
  const {setCartItems,setTotalCartQuantity}=useContext(CartContext);
  useEffect(()=>{
    setCartItems([]);
    setTotalCartQuantity(0);
  },[])
  return (
    <div className={styles.orderPlaced}>
      {!textMessage && <div className={styles.tickIcon}>
        <img src={OrderPlacedSuccesfully} alt="order-placed-tick" />
      </div>}
      {textMessage && <div className={styles.paymentInProgress}>
      <img src={PaymentInProgress} alt="payment-in-progress" />
      </div>}
      <div className={styles.orderPlacedSuccessfullyText}> {textMessage||'Order Placed Successfully !'}</div>
      <div className={styles.goToHomepage} role="button" tabIndex={0} onClick={redirectToHomepage}>
        Go Home
      </div>
    </div>
  );
}

export default OrderPlaced;
