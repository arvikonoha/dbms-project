import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import RegisterUser from "./registerUser";
import RegisterVendor from "./registerVendor";

function CheckBox() {
  let isVendor = useStoreState(state => state.form.isVendor);
  let isLogin = useStoreState(state => state.form.isLogin);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  let setVendor = useStoreActions(action => action.form.setVendor);
  function resolveClass(){
    if(isVendor)
      return "green-check"
    else 
      return "gray-check"
  }
  return (
    <label htmlFor="vendor-check">
      Are you a vendor?
      <span className={resolveClass()}>
      <i class="fas fa-check-circle" onClick={
        e => {
          setVendor(!isVendor);
          if (!isLogin) {
            if (isVendor) setCurrentForm(RegisterUser);
            else setCurrentForm(RegisterVendor);
          }
        }
      }></i>
      <input
        type="checkbox"
        name="vendor-check"
        id="vendor-check"
        hidden={true}
      />
      </span>
    </label>
  );
}

export default CheckBox;
