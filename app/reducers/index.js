import {combineReducers} from 'redux'

import homePage from './homeReducer'
import login from './loginReducer'
import recentDiary from './recentDiaryReducer'
import hotDiary from './hotDiaryReducer'
import collections from './collectionsReducer'
import discovery from './discoveryReducer'
import lovedList from './lovedReducer'
import talkList from './topicReducer'
import search from './searchReducer'
import trash from './trashReducer'
import personalData from './personalReducer'
import register from './registerReducer'
export default combineReducers({
  homePage,
  login,
  recentDiary,
  hotDiary,
  collections,
  discovery,
  lovedList,
  talkList,
  search,
  trash,
  personalData,
  register
})
