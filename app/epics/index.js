import { combineEpics } from 'redux-observable'
import loginEpic from './loginEpic'
import homeInitEpic from './home'
import recentInitEpic from './recentDiaryEpic'

export default combineEpics(
  loginEpic, homeInitEpic, recentInitEpic
)
