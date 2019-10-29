import {
  action,
  thunk
} from 'easy-peasy'
import axios from 'axios'

const profile = {
  isAuth: false,
  setAuth: action((state, payload) => {
    state["isAuth"] = payload
  }),
  isLoading: true,
  setLoading: action((state, payload) => {
    state["isLoading"] = payload
  }),
  vendorErrors: {},
  setError: action((state, payload) => {
    state["vendorErrors"] = payload
  }),
  currentService: "",
  currentServiceId: "",
  setCurrentServiceId: action((state, payload) => {
    state["currentServiceId"] = payload
  }),
  updateSuccess: false,
  setCurrentService: action((state, payload) => {
    state["currentService"] = payload
  }),
  title: "Anonymous",
  category: "Unknown",
  location: "Unknown",
  email: "Unknown",
  address: "Unknown",
  phone: "Unknown",
  description: "No description provided",
  services: [],
  orders: [],
  setProfileDetails: action((state, payload) => {
    for (let i in payload)
      state[i] = payload[i]
  }),
  setService: action((state, payload) => {
    let {
      service_id
    } = payload
    let ind = state["services"].findIndex(element => element.service_id === service_id);
    if (ind !== -1)
      state["services"][ind] = payload
    else
      state["services"].push(payload)

  }),
  deleteAccount: thunk(async (action, payload) => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`/deleteaccount/${payload}`, config)

      action.setAuth(false);
      action.setProfileDetails({
        category: "Unknown",
        location: "Unknown",
        title: "Unknown",
        email: "Unknown",
        phone: "Unknown",
        address: "Unknown",
        vid: "",
        token: "",
        services: [],
        description: "No description provided"
      });
      window.location.href = "/"
      localStorage.removeItem("vendorToken");
      action.setUpdateSuccess(true)
    } catch (err) {
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  updateBasic: thunk(async (action, {
    vid
  }) => {
    console.log('Update basic')
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      if (i[0] !== "vendor-check")
        body[i[0]] = i[1]
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`/updatebasic`, body, config)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }

  }),
  updateContact: thunk(async (action) => {
    console.log('Update contact')
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      if (i[0] !== "vendor-check")
        body[i[0]] = i[1]
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`/updatecontact`, body, config)

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }

  }),
  deleteContact: thunk(async (action) => {

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`/deletecontact`, config)

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  deleteService: action((state) => {
    state["services"] = state["services"].filter(item => item.service_id !== state.currentServiceId)
  }),
  permaDeleteService: thunk(async (action, currentServiceId) => {

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`/deleteservice/${currentServiceId}`, config)

      action.deleteService()
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  deleteDescription: thunk(async (action) => {

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`/deletedescription`, config)

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  updateDescription: thunk(async (action) => {

    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      body[i[0]] = i[1]

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`/updatedescription`, body, config)

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  updateService: thunk(async (action,
    currentServiceId
  ) => {

    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      body[i[0]] = i[1]

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`/updateservice/${currentServiceId}`, body, config)

      action.setService(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  insertService: thunk(async (action) => {

    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      if (i[0] !== "vendor-check")
        body[i[0]] = i[1]
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`/insertservice`, body, config)

      action.setService(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {


      // action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }


  }),
  setUpdateSuccess: action((state, payload) => {
    state["updateSuccess"] = payload
  }),
  loadProfile: thunk(async (action, vid) => {
    try {
      let result = await axios.get(`/profile/${vid}`)
      action.setProfileDetails(result.data)
      action.setLoading(false)
    } catch (err) {

      action.setError(err.response.data)
      action.setLoading(false)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  registerForm: thunk(async (action) => {
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      if (i[0] !== "vendor-check")
        body[i[0]] = i[1]
    try {
      let result = await axios.post(' /register/vendor', body)

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      action.setLoading(false)
      localStorage.setItem("vendorToken", result.data.token)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
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

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      action.setLoading(false)
      localStorage.setItem("vendorToken", result.data.token)
    } catch (err) {

      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  getVendor: thunk(async (action) => {
    try {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("vendorToken")
        }
      }
      let result = await axios.get(' /getvendor', config)

      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      action.setLoading(false)
    } catch (err) {

      localStorage.removeItem("userToken")
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  setVendorFormSubmit: thunk((action, payload) => {
    if (payload.includes("register"))
      action.registerForm()
    else
    if (payload.includes("login"))
      action.loginForm()
  }),
  submitUpdate: thunk((action, {
    currentForm,
    vid,
    currentServiceId
  }) => {

    switch (currentForm) {
      case 'update-basic':
        action.updateBasic(vid);
        break;
      case 'update-contact':
        action.updateContact();
        break;
      case 'update-desc':
        action.updateDescription();
        break;
      case 'update-service':
        action.updateService(currentServiceId);
        break;
      case 'ins-service':
        action.insertService();
        break;
      case 'delete-contact':
        action.deleteContact();
        break;
      case 'delete-service':
        action.permaDeleteService(currentServiceId);
        break;
      case 'delete-description':
        action.deleteDescription();
        break;
      case 'delete-account':
        action.deleteAccount(true);
        break;
      default:
        console.log("default case")
    }
  })
}

export default profile