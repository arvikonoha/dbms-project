import {
  action,
  thunk
} from 'easy-peasy'
import axios from 'axios'
const query = {
  categories: [],
  querySuccess: false,
  setQuerySuccess: action((state, payload) => {
    state["querySuccess"] = payload
  }),
  setCategories: action((state, payload) => {
    state["categories"] = payload
  }),
  isLoading: true,
  setLoading: action((state, payload) => {
    state["isLoading"] = payload
  }),
  isVendorLoading: true,
  setVendorLoading: action((state, payload) => {
    state["isVendorLoading"] = payload
  }),
  queryErrors: {},
  setErrors: action((state, payload) => {
    state["queryErrors"] = payload
  }),
  setAsyncCategories: thunk(async (action) => {
    try {
      let categories = await axios.get(' /categories')

      action.setCategories(categories.data)
      action.setLoading(false)
      action.setQuerySuccess(true)

    } catch (err) {

      action.setErrors(err.response.data)
      action.setLoading(false)
      setTimeout(() => {
        action.setErrors({})
      }, 4000)
    }
  }),
  vendors: [],
  setVendors: action((state, payload) => {
    state["vendors"] = payload
  }),
  setAsyncVendors: thunk(async (action, payload) => {
    try {
      let vendors = await axios.post(`/fetchvendors/${payload.ishigh}`, payload)

      action.setVendors(vendors.data)
      action.setVendorLoading(false)
      action.setQuerySuccess(true)
    } catch (err) {

      action.setVendors([])
      action.setErrors(err.response.data)
      action.setVendorLoading(false)
      setTimeout(() => {
        action.setErrors({})
      }, 4000)
    }
  })
}

export default query