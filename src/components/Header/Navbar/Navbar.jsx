import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./navbar.css";
import { Link } from "react-router-dom";
import Sidepane from "../Sidepane/Sidepane";
import RegisterForm from "../../Modals/FormActions/CheckBox/registerUser";
import deleteAccount from "./DeleteAccount";

function Navbar() {
  let setVisible = useStoreActions(action => action.form.setVisible);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  let setOrderVisible = useStoreActions(action => action.user.setOrderVisible);
  let setProfileDetails = useStoreActions(
    action => action.profile.setProfileDetails
  );
  let setVendor = useStoreActions(action => action.form.setVendor);
  let setLogin = useStoreActions(action => action.form.setLogin);
  let setUserDetails = useStoreActions(action => action.user.setUserDetails);
  let setUserAuth = useStoreActions(action => action.user.setAuth);
  let setUserUpdateSuccess = useStoreActions(
    action => action.user.setUpdateSuccess
  );
  let setVendorAuth = useStoreActions(action => action.profile.setAuth);
  let setVendorUpdateSuccess = useStoreActions(
    action => action.profile.setUpdateSuccess
  );
  let [isSidepane, toggleSidepane] = useState(false);
  let isVendorAuth = useStoreState(state => state.profile.isAuth);
  let isUserAuth = useStoreState(state => state.user.isAuth);
  let setQuerySuccess = useStoreActions(action => action.query.setQuerySuccess);
  let setVendorLoading = useStoreActions(
    action => action.query.setVendorLoading
  );
  function burgerclass() {
    return isSidepane ? "pos-fix hamburger cross" : "pos-fix hamburger";
  }
  return (
    <nav id="main-nav" className="pd-20">
      <ul>
        <li className=" disp-ib">
          <Link className="normal pd-15 pos-rel f-size-1" to="/">
            Home
          </Link>
        </li>
        <li className=" disp-ib">
          {!isVendorAuth ? (
            <Link
              className="normal pd-15 pos-rel f-size-1"
              to="/services"
              onClick={e => {
                setQuerySuccess(false);
                setVendorLoading(true);
              }}
            >
              Services
            </Link>
          ) : null}
        </li>
        <li className=" disp-ib">
          {!isVendorAuth && !isUserAuth ? (
            <Link
              className="normal pd-15 pos-rel f-size-1"
              to=""
              onClick={e => {
                e.preventDefault();
                setVendor(false);
                setCurrentForm(RegisterForm);
                setVisible(true);
              }}
            >
              Login / Register
            </Link>
          ) : isVendorAuth ? (
            <>
              <Link
                className="normal pd-15 f-size-1 pos-rel cu-po"
                to="/profile/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="normal pd-15 f-size-1 delete-act pos-rel cu-po"
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
                    description: "No description provided"
                  });
                  window.location.href = "/";
                  setCurrentForm(RegisterForm);
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("vendorToken");
                }}
              >
                Log out
              </Link>
              <Link
                className="normal pd-15 f-size-1 delete-act pos-rel cu-po"
                onClick={e => {
                  setCurrentForm(deleteAccount);
                  setUserUpdateSuccess(false);
                  setVendorUpdateSuccess(false);
                }}
              >
                Delete Account
              </Link>
            </>
          ) : (
            <>
              <Link
                className="normal pd-15 pos-rel f-size-1"
                to=""
                onClick={e => {
                  e.preventDefault();
                  setOrderVisible();
                }}
              >
                MyOrders
              </Link>
              <Link
                className="normal pd-15 f-size-1 delete-act pos-rel cu-po"
                onClick={e => {
                  setUserAuth(false);
                  setVendorAuth(false);
                  setUserDetails({
                    f_name: "",
                    l_name: "",
                    address: "",
                    location: "Unknown",
                    email: "Unknown",
                    phone: "Unknown",
                    uid: "",
                    pin: "",
                    token: "",
                    orders: []
                  });
                  window.location.href = "/";
                  setLogin(false);
                  setCurrentForm(RegisterForm);
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("vendorToken");
                }}
              >
                Log out
              </Link>
              <Link
                className="normal pd-15 f-size-1 delete-act pos-rel cu-po"
                onClick={e => {
                  e.preventDefault();
                  setCurrentForm(deleteAccount);
                  setUserUpdateSuccess(false);
                  setVendorUpdateSuccess(false);
                }}
              >
                Delete Account
              </Link>
            </>
          )}
        </li>
        <li>
          <div
            className={burgerclass()}
            onClick={e => toggleSidepane(!isSidepane)}
          >
            <div className="slice pos-rel"></div>
            <div className="slice pos-rel"></div>
            <div className="slice pos-rel"></div>
          </div>
        </li>
        <Sidepane isVisible={isSidepane} toggleVisible={toggleSidepane} />
      </ul>
    </nav>
  );
}

export default Navbar;
