import React, { useState } from "react";
import OrderService from "./OrderServices/OrderService";

function OrderItem({ title, order_from, order_to, services }) {
  let [isVisible, toggleVisible] = useState(false);
  function resolveServiceClass() {
    return isVisible ? "order-service-content" : "order-service-content hide";
  }
  return (
    <li class="hidden-order">
      <div class="update-btns">
        <span
          class="drop-down-btn cu-po"
          onClick={e => {
            toggleVisible(!isVisible);
          }}
        >
          <i class="fas fa-caret-down"></i>
        </span>
      </div>
      <h3>{title}</h3>
      <p>
        from - {new Date(order_from).toDateString()}
        <br />
        to - {new Date(order_to).toDateString()}
      </p>
      <div class={resolveServiceClass()}>
        <ul>
          <h4>Services selected</h4>
          {[...Object.values(services)].map(item => (
            <OrderService
              title={item.service_text}
              vendorId={item.vid}
              vendorTitle={item.title}
            />
          ))}
        </ul>
      </div>
    </li>
  );
}

export default OrderItem;
