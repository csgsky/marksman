import { combineEpics } from 'redux-observable'
import loginEpic from './loginEpic'
import homeInitEpic from './home'
import recentInitEpic from './recentDiaryEpic'
import hotDiaryInitEpic from './hotDiaryEpic'
import collectionInitEpic from './collectionsEpic'
import discoveryInitEpic from './discoveryEpic'
import lovedInitEpic from './lovedEpic'
import talksEpic from './talksEpic'
import searchInitEpic from './searchEpic'
import trashEpic from './trashEpic'
import personalEpic from './personEpic'
import feedbackEpic from './feedbackEpic'
import topicEpic from './topicEpic'
import registerEpic from './registerEpic'
import personalInfo from './personalCenterEpic'
import diaryCommentEpic from './diaryEpic'
import myFollowUsersEpic from './myFollowUsersEpic'
import myFollowTopicsEpic from './myFollowTopicsEpic'
import commentPostEpic from './commentEditorEpic'
import commentsListEpic from './commentsListEpic'
import diaryDetailEpic from './diaryDetailEpic'

export default combineEpics(
  loginEpic, homeInitEpic, recentInitEpic, hotDiaryInitEpic, collectionInitEpic,
  discoveryInitEpic, lovedInitEpic, talksEpic, searchInitEpic, trashEpic, personalEpic,
  feedbackEpic, topicEpic, registerEpic, personalInfo, diaryCommentEpic, myFollowTopicsEpic,
  myFollowUsersEpic, commentPostEpic, commentsListEpic, diaryDetailEpic
)
