import React from "react";

function ProfileOrderDate({ order_from, order_to, ishide }) {
  function resolveclass() {
    return ishide ? "date-info hide" : "date-info";
  }
  return (
    <div class={resolveclass()}>
      <h3>Dates for service</h3>
      <div class="date-from">
        From {new Date(order_from + "").toDateString()}
      </div>
      <div class="date-to">To {new Date(order_to + "").toDateString()}</div>
    </div>
  );
}

export default ProfileOrderDate;
