import React, { useState } from "react";
import "./cart.css";
import { useStoreState } from "easy-peasy";
import CartContent from "./CartContent/CartContent";

function Cart() {
  let [isHidden, toggleHidden] = useState(true);
  let isAuth = useStoreState(state => state.user.isAuth);
  if (isAuth)
    return (
      <div class="cart-button">
        <button
          class="cart-icon"
          onClick={e => {
            toggleHidden(!isHidden);
          }}
        >
          <i class="fas fa-shopping-cart fa-2x"></i>
          <br />
          Cart
        </button>
        <CartContent isHidden={isHidden} />
      </div>
    );
  else return null;
}

export default Cart;
