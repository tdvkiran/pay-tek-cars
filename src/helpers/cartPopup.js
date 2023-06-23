import React from 'react';
const viewCartImageLink =
  'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart';

export function cartPopup(handleCartPopup, totalQuantity, getTotalAmount, styles) {
  return (
    <div className={styles.cartPopup} onClick={handleCartPopup} style={{ bottom: totalQuantity ? '0' : '-57px' }}>
      <div className={styles.totalCartItemsAndTotalCartPrice}>
        <div>{totalQuantity} Item</div>
        <div>|</div>
        <div>{getTotalAmount()}</div>
      </div>
      <div className={styles.viewCart}>
        <div>View Cart</div>
        <div>
          <img src={viewCartImageLink} alt="" />
        </div>
      </div>
    </div>
  );
}
