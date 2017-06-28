import Moment from 'moment'
import * as types from '../actions/diaryAction'
import {getDay, getYYMM, getDate} from '../utils/TimeUtils'
import One from '../img/diary_material_one.jpeg'
import Two from '../img/diary_material_two.jpg'
import Three from '../img/diary_material_three.jpg'
import Four from '../img/diary_material_four.jpeg'
import Five from '../img/diary_material_five.jpeg'
import Six from '../img/diary_material_six.jpeg'
import Seven from '../img/diary_material_seven.jpeg'
import Eight from '../img/diary_material_eight.jpeg'
import Nine from '../img/diary_material_nine.jpeg'
import Ten from '../img/diary_material_ten.jpeg'

const initState = {
  color: '#ffa3c5',
  diary: null,
  day: null,
  yymm: null,
  date: null,
  imgBase64: null,
  source: null,
  materialPosition: -1,
  ifprivate: 1,
  content: '',
  feel: 1,
  success: false
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
        source: action.payload.diary === null ? null : {uri: action.payload.diary.img},
        ifprivate: action.payload.diary === null ? 1 : (action.payload.diary.ifprivate === 0 ? 0 : 1),
        content: action.payload.diary === null ? null : action.payload.diary.content
      }
    case types.WRITE_DIARY_COLOR_CHANGE:
      return {
        ...state,
        color: action.payload.color,
        feel: action.payload.feel
      }
    case types.WRITE_DIARY_PHOTO_PICKER:
      return {
        ...state,
        imgBase64: action.payload.imgBase64,
        source: action.payload.source
      }
    case types.WRITE_DIARY_MATERIAL_PHOTO_SELECT:
      return {
        ...state,
        materialPosition: action.payload.index,
        source: getSource(action.payload.index)
      }
    case types.WRITE_DIARY_DELETE_PHOTO:
      return {
        ...state,
        source: null,
        materialPosition: -1,
        imgBase64: null
      }
    case types.WRITE_DIARY_CHANGE_STATE:
      return {
        ...state,
        ifprivate: state.ifprivate === 1 ? 0 : 1
      }
    case types.WRITE_DIARY_CONTENT_CHANGE:
      return {
        ...state,
        content: action.payload.content
      }
    case types.WRITE_DIARY_POST_DIARY_SUCCESS:
      return {
        ...state,
        success: true
      }
    case types.WRITE_DIARY_CLEAN_PAGE:
      return initState
    default:
      return state
  }
}

function getSource (index) {
  if (index === 0) {
    return One
  } else if (index === 1) {
    return Two
  } else if (index === 2) {
    return Three
  } else if (index === 3) {
    return Four
  } else if (index === 4) {
    return Five
  } else if (index === 5) {
    return Six
  } else if (index === 6) {
    return Seven
  } else if (index === 7) {
    return Eight
  } else if (index === 8) {
    return Nine
  } else if (index === 9) {
    return Ten
  }
  return One
}

