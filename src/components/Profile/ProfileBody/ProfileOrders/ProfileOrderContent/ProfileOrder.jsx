import React, { useState } from "react";
import ProfileOrderContact from "./ProfileOrderContact/ProfileOrderContact";
import ProfileOrderServices from "./ProfileOrderServices/ProfileOrderServices";
import ProfileOrderDate from "./ProfileOrderDate/ProdileOrderDate";

function ProfileOrder({ order }) {
  let [isHidden, toggleHidden] = useState(true);
  return (
    <div class="order-box">
      <div class="update-btns">
        <span
          class="drop-down-btn cu-po"
          onClick={e => toggleHidden(!isHidden)}
        >
          <i class="fas fa-caret-down"></i>
        </span>
      </div>
      <h2>{order.title}</h2>
      <div class="customer-details">
        <i class="fas fa-user-circle"></i> Requested by -
        {" " + order.f_name + " " + order.l_name}
        <ProfileOrderDate
          ishide={isHidden}
          order_from={order.order_from}
          order_to={order.order_to}
        />
        <ProfileOrderServices ishide={isHidden} services={order.services} />
        <ProfileOrderContact
          ishide={isHidden}
          phone={order.phone}
          address={order.address}
          email={order.email}
        />
      </div>
    </div>
  );
}

export default ProfileOrder;
