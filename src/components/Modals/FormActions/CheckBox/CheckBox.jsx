import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import RegisterUser from "./registerUser";
import RegisterVendor from "./registerVendor";

function CheckBox() {
  let isVendor = useStoreState(state => state.form.isVendor);
  let isLogin = useStoreState(state => state.form.isLogin);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  let setVendor = useStoreActions(action => action.form.setVendor);
  return (
    <label htmlFor="vendor-check">
      Are you a vendor?
      <input
        type="checkbox"
        name="vendor-check"
        id="vendor-check"
        checked={isVendor}
        onChange={e => {
          setVendor(!isVendor);
          if (!isLogin) {
            if (isVendor) setCurrentForm(RegisterUser);
            else setCurrentForm(RegisterVendor);
          }
        }}
      />
    </label>
  );
}

export default CheckBox;
