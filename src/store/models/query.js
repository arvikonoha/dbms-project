import {
  action,
  thunk
} from 'easy-peasy'
import axios from 'axios'
const query = {
  categories: [],
  querySuccess: false,
  pageCount:0,
  setPageCount: action((state,payload)=>{
    state["pageCount"] = Math.ceil(payload / 5)
  }),
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
      let categories = await axios.get('  /categories')

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
      let vendors = await axios.post(` /fetchvendors/${payload.ishigh}`, payload)
      console.log(vendors.data)
      if(vendors.data.some(item => item.count))
        action.setPageCount(vendors.data.pop().count)
      
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