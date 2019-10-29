import React from "react";
import { useStoreActions } from "easy-peasy";
import RegisterUser from "../CheckBox/registerUser";

function CloseButton() {
  let setVisible = useStoreActions(action => action.form.setVisible);
  let setVendorSuccess = useStoreActions(
    action => action.profile.setUpdateSuccess
  );
  let setUserSuccess = useStoreActions(action => action.user.setUpdateSuccess);
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  return (
    <div class="update-btns">
      <div
        class="close-btn cu-po"
        onClick={e => {
          setVisible(false);
          setUserSuccess(true);
          setVendorSuccess(true);
          setCurrentForm(RegisterUser);
        }}
      >
        <i class="fas fa-times-circle"></i>
      </div>
    </div>
  );
}

export default CloseButton;
