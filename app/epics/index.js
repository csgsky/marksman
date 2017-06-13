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
import registerEpic from './registerEpic'
export default combineEpics(
  loginEpic, homeInitEpic, recentInitEpic, hotDiaryInitEpic, collectionInitEpic,
  discoveryInitEpic, lovedInitEpic, talksEpic, searchInitEpic, trashEpic, personalEpic,
  registerEpic
)
