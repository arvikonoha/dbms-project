import {
  createStore
} from 'easy-peasy'
import form from './models/form'
import profile from './models/profile'
import user from './models/user'
import query from './models/query'

const state = {
  form,
  profile,
  user,
  query
}

const store = createStore(state)

export default store