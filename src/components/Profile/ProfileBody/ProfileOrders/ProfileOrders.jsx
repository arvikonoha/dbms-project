import React from "react";
import { useStoreState } from "easy-peasy";
import ProfileOrder from "./ProfileOrderContent/ProfileOrder";
import "./ProfileOrderContent/profile-orders.css";

function ProfileOrders() {
  let orders = useStoreState(state => state.profile.orders);
  if (orders.length === 0)
    return (
      <div class="vendor-orders">
        <div class="order-box-container">
          <div className="order-box">
            <p>No orders.</p>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div class="vendor-orders">
        <div class="order-box-container">
          {orders.map(order => (
            <ProfileOrder key={order.order_id} order={order} />
          ))}
        </div>
      </div>
    );
}

export default ProfileOrders;
