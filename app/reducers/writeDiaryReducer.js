import Moment from 'moment'
import * as types from '../actions/diaryAction'
import {getDay, getYYMM, getDate} from '../utils/TimeUtils'

const initState = {
  color: null,
  diary: null,
  day: null,
  yymm: null,
  date: null,
  img: null,
  isLocked: false
}


export default function writeDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.WRITE_DIARY_INIT:
      console.log('writeDiary reducer WRITE_DIARY_INIT-> ' + action.payload)
      return {
        ...state,
        diary: action.payload.diary,
        day: action.payload.diary === null ? getDay(Moment().format()) : getDay(action.payload.diary.create_time),
        yymm: action.payload.diary === null ? getYYMM(Moment().format()) : getYYMM(action.payload.diary.create_time),
        date: action.payload.diary === null ? getDate(Moment().format()) : getDate(action.payload.diary.create_time),
      }
    case types.WRITE_DIARY_COLOR_CHANGE:
      return {
        ...state,
        color: action.payload.color
      }
    default:
      return state
  }
}

