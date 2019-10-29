import React from "react";
import { useStoreState } from "easy-peasy";
import UpdateDesc from "./descriptionform";
import ProfileModifier from "../../ProfileModifier/ProfileModifier";

function ProfileDescription() {
  let description = useStoreState(state => state.profile.description);
  return (
    <div class="profile-description pos-rel pd-30 bg-lw">
      <ProfileModifier formDetails={UpdateDesc} isInsert={false} />
      {description ? (
        description.split().map(item => <p>{item}</p>)
      ) : (
        <p>{"No description provided"}</p>
      )}
    </div>
  );
}

export default ProfileDescription;
