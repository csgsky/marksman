import {combineReducers} from 'redux'

import homePage from './homeReducer'
import login from './login'
import recentDiary from './recentDiaryReducer'
export default combineReducers({
  homePage,
  login,
  recentDiary
})
