import React from "react";
import { useStoreState, action } from "easy-peasy";
import ProfileModifier from "../ProfileModifier/ProfileModifier";
import "./profileheader.css";
import HeaderForm from "./header-form";

function ProfileHeader() {
  let title = useStoreState(state => state.profile.title);
  let location = useStoreState(state => state.profile.location);
  let category = useStoreState(state => state.profile.category);
  return (
    <div class="profile-header pd-30">
      <ProfileModifier formDetails={HeaderForm} isInsert={true} />
      <h2 class="mr-24b">{title}</h2>
      <p class="mr-8b">{location}</p>
      <p class="mr-8b">{category}</p>
    </div>
  );
}

export default ProfileHeader;
