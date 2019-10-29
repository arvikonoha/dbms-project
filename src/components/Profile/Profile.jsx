import React from "react";
import { useStoreState } from "easy-peasy";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileContact from "./ProfileContact/ProfileContact.jsx";
import ProfileBody from "./ProfileBody/ProfileBody";
import "./profile.css";

function Profile() {
  let isUserAuth = useStoreState(state => state.user.isAuth);
  let isVendorAuth = useStoreState(state => state.profile.isAuth);
  return (
    <section id="profile-main" class="container">
      <ProfileHeader />
      <ProfileContact />
      <ProfileBody />
      {!isUserAuth && !isVendorAuth ? (
        <div class="info-modal">
          <p>You must be logged in to make purchases</p>
        </div>
      ) : null}
    </section>
  );
}

export default Profile;
