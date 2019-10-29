import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Redirect } from "react-router-dom";
import LoadingModal from "../../Modals/Loading/LoadingModal";
import Profile from "../Profile";

function ProfileHandler({
  match: {
    params: { vid }
  }
}) {
  let isLoading = useStoreState(state => state.profile.isLoading);
  let vendorErrors = useStoreState(state => state.profile.vendorErrors);
  let isAuth = useStoreState(state => state.profile.isAuth);
  let loadProfile = useStoreActions(action => action.profile.loadProfile);
  let setLoading = useStoreActions(action => action.profile.setLoading);
  function isEmpty(obj) {
    for (let key in obj) if (obj.hasOwnProperty(key)) return false;
    return true;
  }
  useEffect(() => {
    setTimeout(() => {
      if (isLoading && !isAuth) loadProfile(vid);
    }, 2000);
    return () => {
      setLoading(true);
    };
  }, []);
  if (isLoading && !isAuth) return <LoadingModal />;
  else if ((!isEmpty(vendorErrors) || vendorErrors.length > 0) && !isAuth) {
    console.log("here");
    return <Redirect to={{ pathname: "/" }} />;
  } else return <Profile />;
}

export default ProfileHandler;
