import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./loginswitch.css";
import LoginForm from "./loginform";
import RegisterUser from "../CheckBox/registerUser";
import RegisterVendor from "../CheckBox/registerVendor";

function LoginSwitch() {
  let isLogin = useStoreState(state => state.form.isLogin);
  let isVendor = useStoreState(state => state.form.isVendor);
  let setLogin = useStoreActions(action => action.form.setLogin);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  return !isLogin ? (
    <p className="login-switch">
      Already have an account ?
      <span
        className="btn"
        onClick={e => {
          setLogin(true);
          setCurrentForm(LoginForm);
        }}
      >
        press this
      </span>
    </p>
  ) : (
    <p className="login-switch">
      Create a new account
      <span
        className="btn"
        onClick={e => {
          setLogin(false);
          if (isVendor) setCurrentForm(RegisterVendor);
          else setCurrentForm(RegisterUser);
        }}
      >
        by pressing this
      </span>
    </p>
  );
}

export default LoginSwitch;
