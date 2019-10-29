import React from "react";

function ProfileOrderServices({ services, ishide }) {
  function resolveclass() {
    return ishide ? "order-services hide" : "order-services";
  }
  console.log(services.map(item => item.service_text));
  return (
    <div class={resolveclass()}>
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
