import Moment from 'moment'
import * as types from '../actions/diaryAction'
import {getDay, getYYMM, getDate} from '../utils/TimeUtils'
import One from '../img/diary_material_one.jpg'
import Two from '../img/diary_material_two.png'
import Three from '../img/diary_material_three.png'
import Four from '../img/diary_material_four.png'
import Five from '../img/diary_material_five.png'
import Six from '../img/diary_material_six.png'
import Seven from '../img/diary_material_seven.png'
import Eight from '../img/diary_material_eight.png'
import Nine from '../img/diary_material_nine.png'
import Ten from '../img/diary_material_ten.png'

const initState = {
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
      // console.log('writeDiary reducer WRITE_DIARY_INIT -> img ', getMaterialPosition(action.payload.img))
      return {
        ...state,
        diary: action.payload,
        day: action.payload === null ? getDay(Moment().format()) : getDay(action.payload.create_time),
        yymm: action.payload === null ? getYYMM(Moment().format()) : getYYMM(action.payload.create_time),
        date: action.payload === null ? getDate(Moment().format()) : getDate(action.payload.create_time),
        source: action.payload === null ? null : getDefaultSource(action.payload.img),
        materialPosition: action.payload === null ? -1 : getMaterialPosition(action.payload.img),
        ifprivate: action.payload === null ? 1 : (action.payload.ifprivate === 0 ? 0 : 1),
        content: action.payload === null ? null : action.payload.content,
        success: false
      }
    case types.WRITE_DIARY_COLOR_CHANGE:
      return {
        ...state,
        feel: action.payload.feel
      }
    case types.WRITE_DIARY_PHOTO_PICKER:
      return {
        ...state,
        imgBase64: action.payload.imgBase64,
        materialPosition: -1,
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

function getDefaultSource (img) {
  if (img === '0') {
    return One
  } else if (img === '1') {
    return Two
  } else if (img === '2') {
    return Three
  } else if (img === '3') {
    return Four
  } else if (img === '4') {
    return Five
  } else if (img === '5') {
    return Six
  } else if (img === '6') {
    return Seven
  } else if (img === '7') {
    return Eight
  } else if (img === '8') {
    return Nine
  } else if (img === '9') {
    return Ten
  } else if (img === '') {
    return null
  }
  return {uri: img}
}

function getMaterialPosition(img) {
  if (img === '0') {
    return 0
  } else if (img === '1') {
    return 1
  } else if (img === '2') {
    return 2
  } else if (img === '3') {
    return 3
  } else if (img === '4') {
    return 4
  } else if (img === '5') {
    return 5
  } else if (img === '6') {
    return 6
  } else if (img === '7') {
    return 7
  } else if (img === '8') {
    return 8
  } else if (img === '9') {
    return 9
  }
  return -1
}

