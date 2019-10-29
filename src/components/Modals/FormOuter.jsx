import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import FormContainer from "./FormContainer/FormContainer";
import CloseButton from "./FormActions/CloseButton/CloseButton";
import "./formouter.css";
let rlForm = ["register-user", "login-form", "register-vendor"];

function FormOuter() {
  let isVisible = useStoreState(state => state.form.isVisible);
  let isVendor = useStoreState(state => state.form.isVendor);
  let currentServiceId = useStoreState(state => state.profile.currentServiceId);
  let updateSuccess = useStoreState(state => state.profile.updateSuccess);
  let updateSuccessCart = useStoreState(state => state.user.isUpdateSuccess);
  let cartItems = useStoreState(state => state.user.cartItems);
  let setVisible = useStoreActions(action => action.form.setVisible);
  let deleteAccount = useStoreActions(action => action.user.deleteAccount);
  let isUserAuth = useStoreState(state => state.user.isAuth);
  let isVendorAuth = useStoreState(state => state.profile.isAuth);
  let setUpdateSuccess = useStoreActions(
    action => action.user.setUpdateSuccess
  );
  let setVendorUpdateSuccess = useStoreActions(
    action => action.profile.setUpdateSuccess
  );
  let setUserFormSubmit = useStoreActions(
    action => action.user.setUserFormSubmit
  );

  let setVendorFormSubmit = useStoreActions(
    action => action.profile.setVendorFormSubmit
  );
  let submitUpdate = useStoreActions(action => action.profile.submitUpdate);
  let setOrders = useStoreActions(action => action.user.setOrders);
  let currentForm = useStoreState(state => state.form.currentForm);
  let vid = useStoreState(state => state.profile.vid);
  if ((!updateSuccess && !updateSuccessCart) || isVisible)
    return (
      <section id="login-register" class="form-outer">
        <div class="form-container  pd-30">
          <CloseButton />
          <form
            action="POST"
            onSubmit={e => {
              e.preventDefault();
              if (rlForm.some(item => item == currentForm)) {
                if (!isVendor) {
                  setUpdateSuccess(false);
                  setVendorUpdateSuccess(false);
                  setUserFormSubmit(currentForm);
                  setVisible(false);
                } else {
                  setVendorUpdateSuccess(false);
                  setUpdateSuccess(false);
                  setVendorFormSubmit(currentForm);
                  setVisible(false);
                }
              } else if (
                currentForm.includes("update") ||
                currentForm.includes("delete") ||
                currentForm.includes("service")
              ) {
                if (!isUserAuth && isVendorAuth) {
                  setVendorUpdateSuccess(false);
                  setUpdateSuccess(false);
                  submitUpdate({ currentForm, vid, currentServiceId });
                } else {
                  setVendorUpdateSuccess(false);
                  setUpdateSuccess(false);
                  deleteAccount(false);
                }
                setVisible(false);
              } else {
                setVendorUpdateSuccess(false);
                setUpdateSuccess(false);
                setVisible(false);
                setOrders(cartItems.map(item => item.service_id));
              }
            }}
          >
            <FormContainer />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    );
  else return null;
}

export default FormOuter;
