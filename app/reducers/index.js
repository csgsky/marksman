import {combineReducers} from 'redux'

import homePage from './homeReducer'
import login from './login'

let reducer = combineReducers({
  homePage,
  login
})

export default reducer
