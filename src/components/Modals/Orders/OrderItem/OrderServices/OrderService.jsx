import React from "react";
import { Link } from "react-router-dom";

function OrderService({ title, vendorId, vendorTitle }) {
  return (
    <>
      <li>
        <span class="service">{title}</span>
      </li>
      <li>
        Provided by
        <Link className="white-text" to={`profile/${vendorId}`}>
          {vendorTitle}
        </Link>
      </li>
    </>
  );
}

export default OrderService;
