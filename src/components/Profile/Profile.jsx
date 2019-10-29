import React from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileContact from "./ProfileContact/ProfileContact.jsx";
import ProfileBody from "./ProfileBody/ProfileBody";
import "./profile.css";

class Profile extends React.Component {
  render() {
    return (
      <section id="profile-main" class="container">
        <ProfileHeader />
        <ProfileContact />
        <ProfileBody />
      </section>
    );
  }
}

export default Profile;
