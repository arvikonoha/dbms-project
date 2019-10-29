import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import CartSubmit from "./CartSubmit";

function CartContent({ isHidden }) {
  let deleteCartItem = useStoreActions(action => action.user.deleteCartItem);
  let deleteCart = useStoreActions(action => action.user.deleteCart);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  let setVisible = useStoreActions(action => action.form.setVisible);
  let setUpdateSuccess = useStoreActions(
    action => action.user.setUpdateSuccess
  );

  let cartItems = useStoreState(state => state.user.cartItems);
  function resolveContentClass() {
    return isHidden ? "cart-content hide" : "cart-content";
  }

  if (cartItems.length > 0) {
    return (
      <div class={resolveContentClass()}>
        <ul>
          <h2>Services selected</h2>
          {cartItems.map(item => (
            <li key={item.service_id}>
              <span class="service">{item.service_text}</span>
              <span class="price pd-8y pd-16x cu-po">
                &#8377;{item.service_price}
                <i
                  onClick={e => {
                    deleteCartItem(item.service_id);
                  }}
                  class="fas fa-times-circle"
                ></i>
              </span>
            </li>
          ))}
          <li>
            <span class="service total cu-po">Total</span>
            <span class="price pd-8y pd-16x">
              &#8377;
              {cartItems.reduce((prev, item) => {
                prev += +item.service_price;
                return prev;
              }, 0)}
              <i
                class="fas fa-times-circle cu-po"
                onClick={e => {
                  deleteCart();
                }}
              ></i>
            </span>
          </li>
          <li>
            <button
              class="pd-8y"
              onClick={e => {
                setCurrentForm(CartSubmit);
                setVisible(true);
                setUpdateSuccess(false);
              }}
            >
              Confirm <i class="far fa-check-circle"></i>
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div class={resolveContentClass()}>
        <p>Cart is empty</p>
      </div>
    );
  }
}

export default CartContent;
