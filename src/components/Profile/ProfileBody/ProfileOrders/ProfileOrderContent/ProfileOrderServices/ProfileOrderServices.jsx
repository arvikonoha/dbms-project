import React from "react";

function ProfileOrderServices({ services, ishide }) {
  function resolveclass() {
    return ishide ? "order-services hide" : "order-services";
  }
  return (
    <div class="order-services hide">
      <h3>Services requested</h3>
      <ul>
        {services.map(item => (
          <li>
            <i class="fas fa-cogs"></i> {item.service_text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileOrderServices;
