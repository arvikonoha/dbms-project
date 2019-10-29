const RegisterVendor = {
  currentForm: "register-vendor",
  formFields: [{
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter your Business title"
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter your Business location"
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      placeholder: "Enter your Business category"
    },
    {
      name: "user_email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email"
    },
    {
      name: "user_password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password"
    },
    {
      name: "user_cpassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm your password"
    }
  ],
  formTitle: "Register your account"
}

export default RegisterVendor