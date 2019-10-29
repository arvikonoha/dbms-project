import React from "react";

function ProfileOrderContact({ phone, address, email, ishide }) {
  function resolveclass() {
    return ishide ? "customer-contact hide" : "customer-contact";
  }
  return (
    <div class={resolveclass()}>
      <h3>Customer's contact</h3>
      <div>
        <h4>
          <i class="fas fa-envelope"></i> Email
        </h4>
        <p>{email}</p>
      </div>
      <div>
        <h4>
          <i class="fas fa-phone"></i> Phone no
        </h4>
        <p>{phone}</p>
      </div>
      <div>
        <h4>
          <i class="fas fa-map-marker-alt"></i> Address
        </h4>
        <p>{address}</p>
      </div>
    </div>
  );
}

export default ProfileOrderContact;
