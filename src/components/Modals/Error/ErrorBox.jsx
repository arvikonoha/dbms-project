import React from "react";
import { useStoreState } from "easy-peasy";
import "./errorbox.css";

function ErrorBox() {
  let userErrors = useStoreState(state => state.user.userError);
  let vendorErrors = useStoreState(state => state.profile.vendorErrors);
  let queryErrors = useStoreState(state => state.query.queryErrors);
  let errorArr = [...Object.entries(userErrors)];
  errorArr =
    errorArr.length === 0 ? [...Object.entries(vendorErrors)] : errorArr;
  errorArr =
    errorArr.length === 0 ? [...Object.entries(queryErrors)] : errorArr;
  if (errorArr.length > 0) {
    console.log(errorArr[0][0]);
    if (errorArr[0][1].includes("user_fname"))
      errorArr[0][1] = "User first name must be atleast 2 charectors long";

    if (errorArr[0][1].includes("user_lname"))
      errorArr[0][1] = "User last name must be atleast 2 charectors long";

    if (
      errorArr[0][1].includes("user_password") &&
      !errorArr[0][1].includes("user_cpassword")
    )
      errorArr[0][1] = "User password must be atleast 5 charectors long";

    if (errorArr[0][1].includes("user_cpassword"))
      errorArr[0][1] = "Confirm password must match the password";

    return (
      <div class="error-modal">
        <p>{errorArr[0][1]}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default ErrorBox;
