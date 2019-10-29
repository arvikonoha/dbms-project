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
    let ind = state["services"].findIndex(element => element.service_id == service_id);
    if (ind != -1)
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
      let result = await axios.delete(`https://frozen-brushlands-21504.herokuapp.com/deleteaccount/${payload}`, config)
      console.log(result)
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
      localStorage.removeItem("vendorToken");
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err, err.response.data)
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
      if (i[0] != "vendor-check")
        body[i[0]] = i[1]
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`https://frozen-brushlands-21504.herokuapp.com/updatebasic`, body, config)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
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
      if (i[0] != "vendor-check")
        body[i[0]] = i[1]
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`https://frozen-brushlands-21504.herokuapp.com/updatecontact`, body, config)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }

  }),
  deleteContact: thunk(async (action) => {
    console.log('delete contact')
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`https://frozen-brushlands-21504.herokuapp.com/deletecontact`, config)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
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
    console.log('Delete service', currentServiceId)
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`https://frozen-brushlands-21504.herokuapp.com/deleteservice/${currentServiceId}`, config)
      console.log(result.data)
      action.deleteService()
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  deleteDescription: thunk(async (action) => {
    console.log('delete description')
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.delete(`https://frozen-brushlands-21504.herokuapp.com/deletedescription`, config)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  updateDescription: thunk(async (action) => {
    console.log('Update contact')
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      body[i[0]] = i[1]
    console.log(body)
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`https://frozen-brushlands-21504.herokuapp.com/updatedescription`, body, config)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  updateService: thunk(async (action,
    currentServiceId
  ) => {
    console.log('Update service', currentServiceId)
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      body[i[0]] = i[1]
    console.log(body)
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`https://frozen-brushlands-21504.herokuapp.com/updateservice/${currentServiceId}`, body, config)
      console.log(result.data)
      action.setService(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err.response)
      action.setError(err.response.data)
      setTimeout(() => {
        action.setError({})
      }, 4000);
    }
  }),
  insertService: thunk(async (action) => {
    console.log('insert service')
    let form = new FormData(document.forms[0])
    let body = {}
    for (let i of form.entries())
      if (i[0] != "vendor-check")
        body[i[0]] = i[1]
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("vendorToken")
      }
    }
    try {
      let result = await axios.post(`https://frozen-brushlands-21504.herokuapp.com/insertservice`, body, config)
      console.log(result.data)
      action.setService(result.data)
      action.setUpdateSuccess(true)
    } catch (err) {
      console.log(err)

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
      let result = await axios.get(`https://frozen-brushlands-21504.herokuapp.com/profile/${vid}`)
      action.setProfileDetails(result.data)
      action.setLoading(false)
    } catch (err) {
      console.log(err.response)
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
      if (i[0] != "vendor-check")
        body[i[0]] = i[1]
    try {
      let result = await axios.post(' https://frozen-brushlands-21504.herokuapp.com/register/vendor', body)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      action.setLoading(false)
      localStorage.setItem("vendorToken", result.data.token)
    } catch (err) {
      console.log(err.response)
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
      if (i[0] != "vendor-check")
        body[i[0]] = i[1]
    else
      isVendor = i[1] === "on"
    try {
      let result = await axios.post(`https://frozen-brushlands-21504.herokuapp.com/login/${isVendor}`, body)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      action.setLoading(false)
      localStorage.setItem("vendorToken", result.data.token)
    } catch (err) {
      console.log(err.response)
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
      let result = await axios.get(' https://frozen-brushlands-21504.herokuapp.com/getvendor', config)
      console.log(result.data)
      action.setProfileDetails(result.data)
      action.setUpdateSuccess(true)
      action.setAuth(true)
      action.setLoading(false)
    } catch (err) {
      console.log(err.response, err)
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
    console.log(currentServiceId)
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
      case 'delete-account':
        action.deleteAccount(true);
    }
  })
}

export default profile