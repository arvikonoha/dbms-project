import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./profilecontact.css";
import ProfileModifier from "../ProfileModifier/ProfileModifier";
import UpdateContact from "./profilecontact";

function ProfileContact() {
  let email = useStoreState(state => state.profile.email);
  let phone = useStoreState(state => state.profile.phone);
  let address = useStoreState(state => state.profile.address);
  return (
    <div class="profile-contact">
      <ProfileModifier
        formDetails={UpdateContact}
        isInsert={false}
        isContact={true}
      />
      <h2 class="mr-16b">Contact us</h2>
      <div class="contact-box mr-16b" id="email">
        <h3>
          <i class="fas fa-envelope"></i> Email
        </h3>
        <p>{email}</p>
      </div>
      <div class="contact-box mr-16b" id="phone">
        <h3>
          <i class="fas fa-phone"></i> Phone
        </h3>
        <p>{phone || "No phone number available"}</p>
      </div>
      <div class="contact-box mr-16b" id="address">
        <h3>
          <i class="fas fa-map-marker-alt"></i> Address
        </h3>
        <p>{address || "No address available"}</p>
      </div>
    </div>
  );
}

export default ProfileContact;
