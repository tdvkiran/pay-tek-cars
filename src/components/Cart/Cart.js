import React, { useContext, useState, useCallback } from "react";
import { CartContext } from "../../context/cartContext";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import styles from "./Cart.module.css";
import Payment from "../Payment/Payment";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../PaymentFailed/PaymentFailed";
import Emptycart from "../Emptycart/Emptycart";
import OrderPlaced from "../OrderPlaced/OrderPlaced";
import PaymentIframe from "../PaymentIframe/PaymentIframe";
import _ from "lodash";

function Cart(props) {
  const { history } = props;
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const {  setCartItems ,setTotalCartQuantity} = useContext(CartContext);
  const [isPaymetSuccess, setIsPaymetSuccess] = useState(false);
  const [isPaymentFailed, setIsPaymetFailed] = useState(false);
  const [isSDKLoading, setIsSDKLoading] = useState(true);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isTransactionInProgress , setTransactionInProgress]=useState(false);

  function calculateTotalPrice(price, quantity) {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    const totalPrice = numericPrice * quantity;
    return `$${totalPrice.toLocaleString()}`;
  }
  let totalCartPrice = 0;
  const getTotalAmount = () => {
    cartItems.forEach((car) => {
      const numericPrice = parseFloat(car.price.replace(/[^0-9.-]+/g, ""));
      const totalPrice = numericPrice * car.quantity;
      totalCartPrice += totalPrice;
    });
    return `$${totalCartPrice.toLocaleString()}`;
  };

  const [drawerPosition, setDrawerPositio] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleRetryPayment = () => {
    setIsPaymetSuccess(false);
    setIsPaymetFailed(false);
    setIsSDKLoading(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
   
    if (open === false && isPaymetSuccess) {
      setIsPaymetSuccess(false);
      setIsOrderPlaced(true);
      setCartItems([]);
      setTotalCartQuantity(0);
      setTimeout(() => {
        history.push('/success');
      }, 1000);
    }
    if (open === false) {
      setIsSDKLoading(true);
    }
    if (open === false && isPaymentFailed) {
      setIsPaymetSuccess(false);
      setIsPaymetFailed(false);
      setIsSDKLoading(true);
    }
    setDrawerPositio({ ...drawerPosition, [anchor]: open });
  };
  const handleSDKLoad = () => {
    setIsSDKLoading(false);
  };

  const handleIFrameReady = () => {};

  const handleTransactionSuccess = () => {
    setIsPaymetSuccess(true);
    setIsPaymetFailed(false);
  };

  const handleFailedTransaction = () => {
    setIsPaymetFailed(true);
    setIsPaymetSuccess(false);
  };

  const  handleTransactionInProgress = ()=>{
    setTransactionInProgress(true);
  }
  return cartItems.length > 0 ? (
    <div className={styles.cartContainer}>
      {cartItems.map((car, index) => (
        <div className={styles.cartCard} key={index}>
          <div className={styles.carImage}>
            <img src={car.image} alt="car-image" />
          </div>
          <div className={styles.carInfo}>
            <div className={styles.makeAndModel}>
              <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
            </div>
            <div className={styles.priceAndYear}>
              <p>Unit Price: {car.price}</p>
              <p>Year: {car.year}</p>
            </div>
            <div className={styles.quantityAndTotalPrice}>
              <p>Quantity : {car.quantity}</p>
              <p>Total Price: {calculateTotalPrice(car.price, car.quantity)}</p>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.totalAmountAndPay}>
        <div className={styles.totalAmount}>
          Total Amount is {getTotalAmount()}
        </div>
        <div
          className={styles.proceedToPay}
          onClick={toggleDrawer("right", true)}
          tabIndex={0}
          role="button"
        >
          Proceed To Pay
        </div>
      </div>
      <Drawer
        anchor="right"
        open={drawerPosition.right}
        onClose={toggleDrawer("right", false)}
        PaperProps={{ className: styles.drawer } }
      >
        <DialogTitle disableTypography className={styles.drawerTitle}>
          <Typography variant="h6"> Payment </Typography>
          <IconButton
            onClick={toggleDrawer("right", false)}
            className={styles.closeIcon}
          >
            <CancelIcon fontSize="medium" />
          </IconButton>
        </DialogTitle>
        {isSDKLoading && (
          <div className={styles.Loader}>
            <CircularProgress />
          </div>
        )}
        {
          isTransactionInProgress&&<div className={styles.redirecting}>Redirecting....</div>
        }
        {!isPaymetSuccess && !isPaymentFailed && (
          <PaymentIframe
            totalCartPrice={totalCartPrice}
            handleIFrameReady={handleIFrameReady}
            handleFailedTransaction={handleFailedTransaction}
            handleSDKLoad={handleSDKLoad}
            handleTransactionSuccess={handleTransactionSuccess}
            totalAmount={totalCartPrice}
            handleTransactionInProgress={ handleTransactionInProgress}
          />
        )}
        {isPaymetSuccess && <PaymentSuccess  toggleDrawerHelper={toggleDrawer}/>}
        {isPaymentFailed && (
          <PaymentFailed handleRetryPayment={handleRetryPayment} />
        )}
      </Drawer>
    </div>
  ) :  <Emptycart history={history} />
}

export default Cart;
