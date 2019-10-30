import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import RegisterForm from "../../Modals/FormActions/CheckBox/registerUser";
import "./sidepane.css";
import deleteAccount from "../Navbar/DeleteAccount";

function Sidepane({ isVisible, toggleVisible }) {
  let setVisible = useStoreActions(action => action.form.setVisible);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  let setLogin = useStoreActions(action => action.form.setLogin);
  let setOrderVisible = useStoreActions(action => action.user.setOrderVisible);
  let isUserAuth = useStoreState(state => state.user.isAuth);
  let isVendorAuth = useStoreState(state => state.profile.isAuth);
  let vid = useStoreState(state => state.profile.vid);
  let setProfileDetails = useStoreActions(
    action => action.profile.setProfileDetails
  );
  let setUserDetails = useStoreActions(action => action.user.setUserDetails);
  let setUserAuth = useStoreActions(action => action.user.setAuth);
  let setVendorAuth = useStoreActions(action => action.profile.setAuth);
  let setQuerySuccess = useStoreActions(action => action.query.setQuerySuccess);
  let setVendorLoading = useStoreActions(
    action => action.query.setVendorLoading
  );
  let setUserUpdateSuccess = useStoreActions(
    action => action.user.setUpdateSuccess
  );
  let setVendorUpdateSuccess = useStoreActions(
    action => action.profile.setUpdateSuccess
  );
  function sidepaneClass() {
    return isVisible
      ? "pos-fix sidepane ht-100v pd-30"
      : "pos-fix sidepane ht-100v pd-30 hide";
  }
  return (
    <div className={sidepaneClass()}>
      <ul>
        <li className="pd-8x pd-16y disp-bl">
          <Link to="/" className="pd-8x pd-16y">
            Home
          </Link>
        </li>
        <li className="pd-8x pd-16y disp-bl">
          <Link
            to="/services"
            className="pd-8x pd-16y"
            onClick={e => {
              setQuerySuccess(false);
              setVendorLoading(true);
            }}
          >
            Services
          </Link>
        </li>
        {!(isUserAuth || isVendorAuth) ? (
          <li className="pd-8x pd-16y disp-bl">
            <Link
              className="pd-8x pd-16y"
              href=""
              onClick={e => {
                e.preventDefault();
                setVisible(true);
              }}
            >
              Login / Register
            </Link>
          </li>
        ) : isVendorAuth ? (
          <>
            <li className="pd-8x pd-16y disp-bl">
              <Link
                className="pd-8x pd-16y"
                to={`profileinfo/${vid}`}
                onClick={e => {
                  toggleVisible(false);
                }}
              >
                Dashboard
              </Link>
            </li>
            <li className="pd-8x pd-16y disp-bl">
              <Link
                className="pd-8x pd-16y"
                onClick={e => {
                  setUserAuth(false);
                  setVendorAuth(false);
                  setProfileDetails({
                    category: "Unknown",
                    location: "Unknown",
                    title: "Unknown",
                    email: "Unknown",
                    phone: "Unknown",
                    address: "Unknown",
                    vid: "",
                    token: "",
                    services: [],
                    orders: [],
                    description: "No description provided"
                  });
                  setLogin(false);
                  setCurrentForm(RegisterForm);
                  window.location.href = "/";
                  toggleVisible(false);
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("vendorToken");
                }}
              >
                Log out
              </Link>
            </li>
            <li className="pd-8x pd-16y disp-bl">
              <Link
                className="pd-8x pd-16y"
                onClick={e => {
                  e.preventDefault();
                  console.log(e);
                  toggleVisible(false);
                  setCurrentForm(deleteAccount);
                  setUserUpdateSuccess(false);
                  setVendorUpdateSuccess(false);
                }}
              >
                Delete Account
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="pd-8x pd-16y disp-bl">
              <Link
                className="pd-8x pd-16y"
                href=""
                onClick={e => {
                  e.preventDefault();
                  toggleVisible(false);
                  setOrderVisible();
                }}
              >
                MyOrders
              </Link>
            </li>
            <li className="pd-8x pd-16y disp-bl">
              <Link
                className="pd-8x pd-16y"
                onClick={e => {
                  setUserAuth(false);
                  setVendorAuth(false);
                  setUserDetails({
                    f_name: "",
                    l_name: "",
                    address1: "",
                    address2: "",
                    location: "Unknown",
                    email: "Unknown",
                    phone: "Unknown",
                    uid: "",
                    pin: "",
                    token: "",
                    orders: []
                  });
                  toggleVisible(false);
                  setCurrentForm(RegisterForm);
                  window.location.href = "/";
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("vendorToken");
                }}
              >
                Log out
              </Link>
            </li>
            <li className="pd-8x pd-16y disp-bl">
              <Link
                className="pd-8x pd-16y"
                onClick={e => {
                  e.preventDefault();
                  console.log(e);
                  toggleVisible(false);
                  setCurrentForm(deleteAccount);
                  setUserUpdateSuccess(false);
                  setVendorUpdateSuccess(false);
                }}
              >
                Delete Account
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidepane;
