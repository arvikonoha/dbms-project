import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./fields.css";

function Field({ name, label, type, placeholder, required }) {
  let currentServiceId = useStoreState(state => state.profile.currentServiceId);
  return (
    <>
      <label for={name}>{label}</label>
      {name === "address" || name === "description" ? (
        <textarea
          name={name}
          id={name}
          className="pd-8y pd-16x mr-16b"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className="pd-8y pd-16x mr-16b"
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={!required}
          min={type === "number" ? 0 : ""}
        />
      )}
    </>
  );
}

export default Field;
