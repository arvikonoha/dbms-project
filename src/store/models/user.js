import {
  action,
  thunk
} from 'easy-peasy'
import axios from 'axios'

const user = {
  isOrderVisible: false,
  isAuth: false,
  setAuth: action((state, payload) => {
    state["isAuth"] = payload
  }),
  userError: {},
  setError: action((state, payload) => {
    state["userError"] = payload
  }),
  uid: "",
  f_name: "",
  l_name: "",
  email: "",
  token: "",
  isUpdateSuccess: true,
  setUpdateSuccess: action(async (state, payload) => {
    state["isUpdateSuccess"] = payload
  }),
  deleteAccount: thunk(async (action, payload) => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("userToken")
      }
    }
    try {
      let result = await axios.delete(`/deleteaccount/${payload}`, config)

      action.setAuth(false);
      action.setUserDetails({
        f_name: "",
        l_name: "",
        address1: "",
        address2: "",
        location: "Unknown",
        email: "Unknown",
        phone: "Unknown",
        uid: "",
        pin: "",
        token: "",
        orders: []
      });
      localStorage.removeItem("userToken");
      window.location.href = "/"
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  setOrderVisible: action((state) => {
    state["isOrderVisible"] = !state["isOrderVisible"]
  }),
  cartItems: [],
  orders: [],
  insertorder: action((state, payload) => {
    state["orders"].push(payload)
  }),
  setOrders: thunk(async (action, payload) => {
    const form = new FormData(document.forms[0])
    let address = form.get('address')
    let phone = form.get('phone')
    let from = form.get('from')
    let to = form.get('to')
    let title = form.get('title')
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("userToken")
      }
    }
    try {
      let result = await axios.post(' /insertorder', {
        address,
        title,
        phone,
        from,
        to,
        services: payload
      }, config)
      action.insertorder(result.data)
      action.deleteCart()
      action.setUpdateSuccess(true)
    } catch (err) {

      if (err.response)
        action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  getUser: thunk(async (action) => {
    try {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("userToken")
        }
      }
      let result = await axios.get(' /getuser', config)

      action.setUserDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)

    } catch (err) {

      localStorage.removeItem("userToken")
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  setUserDetails: action((state, payload) => {
    for (let i in payload)
      state[i] = payload[i]
  }),
  loginForm: thunk(async (action) => {
    let form = new FormData(document.forms[0])
    let body = {}
    let isVendor;
    for (let i of form.entries())
      if (i[0] !== "vendor-check")
        body[i[0]] = i[1]
    else
      isVendor = i[1] === "on"
    try {
      let result = await axios.post(`/login/${isVendor}`, body)

      action.setUserDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      localStorage.setItem("userToken", result.data.token)
    } catch (err) {

      if (err.response)
        action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  registerForm: thunk(async (action) => {
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      body[i[0]] = i[1]
    try {
      let result = await axios.post(' /register/user', body)

      action.setUserDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      localStorage.setItem("userToken", result.data.token)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  setUserFormSubmit: thunk((action, payload) => {
    if (payload.includes("register"))
      action.registerForm()
    else if (payload.includes("login"))
      action.loginForm()
  }),
  setCart: action((state, payload) => {
    state["cartItems"].push(payload)

  }),
  deleteCartItem: action((state, payload) => {
    state["cartItems"] = state["cartItems"].filter(item => item.service_id !== payload)

  }),
  deleteCart: action(state => {
    state["cartItems"] = []
    localStorage.removeItem("myCart")
  })
}

export default user