import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import deleteContact from "./deleteContact";
import deleteService from "./deleteService";
import deleteDescription from "./deleteDescription";

function ProfileModifier({
  formDetails,
  currentService,
  isInsert,
  isService,
  isContact,
  currentServiceId
}) {
  let setCurrentForm = useStoreActions(action => action.form.setCurrentForm);
  let setVisible = useStoreActions(action => action.form.setVisible);
  let setUpdateVendorSuccess = useStoreActions(
    action => action.profile.setUpdateSuccess
  );
  let setUpdateUserSuccess = useStoreActions(
    action => action.user.setUpdateSuccess
  );
  let setCurrentService = useStoreActions(
    action => action.profile.setCurrentService
  );
  let setCurrentServiceId = useStoreActions(
    action => action.profile.setCurrentServiceId
  );

  let isAuth = useStoreState(state => state.profile.isAuth);
  if (isAuth)
    return (
      <div class="update-btns">
        <span
          class="edit-btn cu-po"
          onClick={e => {
            setCurrentForm(formDetails);
            setCurrentService(currentService);
            setCurrentServiceId(currentServiceId);
            setVisible(true);
            setUpdateUserSuccess(false);
            setUpdateVendorSuccess(false);
          }}
        >
          <i class="fas fa-edit"></i>
        </span>
        {!isInsert ? (
          <span
            class="delete-btn cu-po"
            onClick={e => {
              deleteService.contents = [currentService];
              setCurrentService(currentService);
              setCurrentServiceId(currentServiceId);
              if (isService) {
                setCurrentForm(deleteService);
              } else if (isContact) {
                setCurrentForm(deleteContact);
              } else {
                setCurrentForm(deleteDescription);
              }
              setVisible(true);
              setUpdateUserSuccess(false);
              setUpdateVendorSuccess(false);
            }}
          >
            <i class="fas fa-trash-alt"></i>
          </span>
        ) : null}
      </div>
    );
  else return null;
}

export default ProfileModifier;
