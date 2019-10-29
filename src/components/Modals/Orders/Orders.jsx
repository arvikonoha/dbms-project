import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import OrderItem from "./OrderItem/OrderItem";
import "./orders.css";

function Orders() {
  let orders = useStoreState(state => state.user.orders);
  let isOrderVisible = useStoreState(state => state.user.isOrderVisible);
  let setOrderVisible = useStoreActions(action => action.user.setOrderVisible);
  function resolveOrderClass() {
    return isOrderVisible ? "order-content" : "order-content hide";
  }
  if (orders.length > 0)
    return isOrderVisible ? (
      <div className={resolveOrderClass()}>
        <div className="update-btns">
          <div
            class="close-btn cu-po"
            onClick={e => {
              setOrderVisible();
            }}
          >
            <i class="fas fa-times-circle"></i>
          </div>
        </div>
        <h2>Your orders</h2>
        <ul>
          {orders.map(item => (
            <OrderItem
              title={item.title}
              order_from={item.order_from}
              order_to={item.order_to}
              services={item.services}
            />
          ))}
        </ul>
      </div>
    ) : null;
  else
    return isOrderVisible ? (
      <div className={resolveOrderClass()}>
        <p>No orders</p>
      </div>
    ) : null;
}

export default Orders;
