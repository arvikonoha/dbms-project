import {
  action,
  thunk
} from "easy-peasy";
import axios from 'axios'
const form = {
  isLogin: false,
  isVendor: false,
  isAuth: false,
  setLogin: action((state, isLogin) => {
    state.isLogin = isLogin
    console.log(state.isLogin, isLogin)
  }),
  setVendor: action((state, isVendor) => {
    state.isVendor = isVendor
    console.log(state.isVendor, isVendor)
  }),
  setVisible: action((state, isVisible) => {
    state.isVisible = isVisible
  }),
  currentForm: "register-user",
  isVisible: false,
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
  formTitle: "Register your account",
  setCurrentForm: action((state, formDetails) => {
    let {
      currentForm,
      formTitle,
      formFields
    } = formDetails;
    console.log(currentForm, formTitle, formFields);
    for (let key in formDetails) state[key] = formDetails[key];
  }),
  submitUser: thunk(async (action) => {
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      body[i[0]] = i[1]
    try {
      let result = await axios.post(' https://frozen-brushlands-21504.herokuapp.com/register/user', body)
      console.log(result.data)
      action.setVisible(false)
    } catch (err) {
      console.log(err.response)
    }

  }),
  submitVendor: thunk(async (action) => {
    console.log('Submit vendor')
  }),
  loginForm: thunk(async (action) => {
    // console.log('Login')

  }),
  submitForm: thunk(async (action, formType) => {
    switch (formType) {
      case 'register-user':
        action.submitUser();
        break;
      case 'register-vendor':
        action.submitVendor();
        break;
      case 'login-form':
        action.loginForm();
        break;
      default:
        console.log('Hello')
    }
  })
};

export default form;