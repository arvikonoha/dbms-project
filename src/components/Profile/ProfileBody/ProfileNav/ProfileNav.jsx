import React, { useState } from "react";
import "./profilenav.css";
import { useStoreState } from "easy-peasy";
import InsertService from "./insertService";
import ProfileModifier from "../../ProfileModifier/ProfileModifier";

function ProfileNav({ toggleContent }) {
  let [currentContent, setContent] = useState("services");
  let isAuth = useStoreState(state => state.profile.isAuth);
  function resolveClass(i) {
    return function contentClass() {
      return i == currentContent ? "current" : "";
    };
  }
  return (
    <nav class="profile-body-nav">
      <ProfileModifier formDetails={InsertService} isInsert={true} />
      <ul>
        <li>
          <a
            href=""
            className={resolveClass("services")()}
            onClick={e => {
              e.preventDefault();
              setContent("services");
              toggleContent("services");
            }}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href=""
            className={resolveClass("description")()}
            onClick={e => {
              e.preventDefault();
              setContent("description");
              toggleContent("description");
            }}
          >
            Description
          </a>
        </li>
        {isAuth ? (
          <li>
            <a
              href=""
              className={resolveClass("orders")()}
              onClick={e => {
                e.preventDefault();
                setContent("orders");
                toggleContent("orders");
              }}
            >
              Orders
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default ProfileNav;
