import {combineReducers} from 'redux'

import homePage from './homeReducer'
import login from './login'
import recentDiary from './recentDiaryReducer'
import hotDiary from './hotDiaryReducer'
export default combineReducers({
  homePage,
  login,
  recentDiary,
  hotDiary
})
