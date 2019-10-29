const UpdateContact = {
  currentForm: "update-contact",
  formFields: [{
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Update your email"
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Update your phone"
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Update your address"
    }
  ],
  formTitle: "Update your email,phone or address",
  required: 'false'
}

export default UpdateContact