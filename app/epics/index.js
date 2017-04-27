import { combineEpics } from 'redux-observable'
import loginEpic from './loginEpic'
import homeInitEpic from './home'
export default combineEpics(
  loginEpic, homeInitEpic
)
