import {combineReducers} from 'redux'

import homePage from './homeReducer'
import login from './login'
import recentDiary from './recentDiaryReducer'
import hotDiary from './hotDiaryReducer'
import collections from './collectionsReducer'
import discovery from './discoveryReducer'
import lovedList from './lovedReducer'
import talkList from './topicReducer'
export default combineReducers({
  homePage,
  login,
  recentDiary,
  hotDiary,
  collections,
  discovery,
  lovedList,
  talkList
})
