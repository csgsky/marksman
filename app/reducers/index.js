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
import feedback from './feedback'
import topic from './topic'
import register from './registerReducer'
import personalCenter from './personalCenterReducer'
import diaryDetail from './diaryDetailReducer'
import myFollowUsers from './myFollowUsersReducer'
import myFollowTopics from './myFollowTopicsReducer'
import commentEditor from './commentEditorReducer'
import commentsList from './commentsListReducer'

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
  feedback,
  topic,
  register,
  personalCenter,
  diaryDetail,
  myFollowUsers,
  myFollowTopics,
  commentEditor,
  commentsList
})
