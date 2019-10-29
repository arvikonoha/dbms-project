const RegisterUser = {
  currentForm: "register-user",
  formFields: [{
      name: "user_fname",
      label: "First name",
      type: "text",
      placeholder: "Enter your first name"
    },
    {
      name: "user_lname",
      label: "Last name",
      type: "text",
      placeholder: "Enter your last name"
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

export default RegisterUser