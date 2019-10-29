import React from "react";
import { useStoreState } from "easy-peasy";
import CheckBox from "../FormActions/CheckBox/CheckBox";
import Field from "../Field/Field";
import "./formcontainer.css";
import LoginSwitch from "../FormActions/LoginSwitch/LoginSwitch";
let requiresCheckbox = ["register-user", "login-form", "register-vendor"];

function FormContainer() {
  let form = useStoreState(state => state.form);
  return (
    <>
      <h2>{form.formTitle}</h2>
      {form.formFields.map(({ name, label, type, placeholder, required }) => (
        <Field
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
          required={required}
          key={name}
        />
      ))}
      {form.contents && form.formTitle.includes("delet")
        ? form.contents.map(item => (
            <p className="f-size-1 delete-content">{item}</p>
          ))
        : null}
      {requiresCheckbox.some(item => item === form.currentForm) ? (
        <>
          <CheckBox />
          <LoginSwitch />
        </>
      ) : null}
    </>
  );
}

export default FormContainer;
