import React, { useState } from "react";
import ProfileNav from "./ProfileNav/ProfileNav";
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import ProfileServices from "./ProfileServices/ProfileServices";
import ProfileOrders from "./ProfileOrders/ProfileOrders";
import "./profilebody.css";

function ProfileBody() {
  let [content, toggleContent] = useState("services");
  return (
    <div class="profile-body">
      <ProfileNav toggleContent={toggleContent} />
      {content === "services" ? (
        <ProfileServices />
      ) : content === "description" ? (
        <ProfileDescription />
      ) : content === "orders" ? (
        <ProfileOrders />
      ) : null}
    </div>
  );
}

export default ProfileBody;
