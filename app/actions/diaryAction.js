// export const DIARY_COMMENT_INIT = 'DIARY_COMMENT_INIT'
// export const DIARY_COMMENT_DATA = 'DIARY_COMMENT_DATA'
import {NativeModules} from 'react-native'

export const WRITE_DIARY_INIT = 'WRITE_DIARY_INIT'
export const WRITE_DIARY_COLOR_CHANGE = 'WRITE_DIARY_COLOR_CHANGE'
export const WRITE_DIARY_PHOTO_PICKER = 'WRITE_DIARY_PHOTO_PICKER'
export const WRITE_DIARY_MATERIAL_PHOTO_SELECT = 'WRITE_DIARY_MATERIAL_PHOTO_SELECT'
export const WRITE_DIARY_DELETE_PHOTO = 'WRITE_DIARY_DELETE_PHOTO'
export const WRITE_DIARY_CHANGE_STATE = 'WRITE_DIARY_CHANGE_STATE'
export const WRITE_DIARY_CONTENT_CHANGE = 'WRITE_DIARY_CONTENT_CHANGE'
export const WRITE_DIARY_POST_DIARY = 'WRITE_DIARY_POST_DIARY'
export const WRITE_DIARY_POST_DIARY_SUCCESS = 'WRITE_DIARY_POST_DIARY_SUCCESS'
export const WRITE_DIARY_CLEAN_PAGE = 'WRITE_DIARY_CLEAN_PAGE'
export const SET_POSTING_STATUS = 'SET_POSTING_STATUS'

export function writeDiaryInit (payload) {
  return {
    type: WRITE_DIARY_INIT,
    payload
  }
}

export function writeDiaryColorChange (payload) {
  return {
    type: WRITE_DIARY_COLOR_CHANGE,
    payload
  }
}
export function photoPicker (payload) {
  return {
    type: WRITE_DIARY_PHOTO_PICKER,
    payload
  }
}

export function selectMaterial(payload) {
  return {
    type: WRITE_DIARY_MATERIAL_PHOTO_SELECT,
    payload
  }
}

export function deletePhoto() {
  NativeModules.TCAgent.track('写日记', '插入图片成功')
  return {
    type: WRITE_DIARY_DELETE_PHOTO
  }
}

export function changeDiaryState () {
  NativeModules.TCAgent.track('写日记', '隐私')
  return {
    type: WRITE_DIARY_CHANGE_STATE
  }
}

export function diaryContentChange (payload) {
  return {
    type: WRITE_DIARY_CONTENT_CHANGE,
    payload
  }
}

export function postDiary (payload, come4) {
  return {
    type: WRITE_DIARY_POST_DIARY,
    payload,
    come4
  }
}

export function postDiarySuccess () {
  return {
    type: WRITE_DIARY_POST_DIARY_SUCCESS
  }
}

export function cleanWritePage () {
  return {
    type: WRITE_DIARY_CLEAN_PAGE
  }
}

export function setPostingStatus () {
  return {
    type: SET_POSTING_STATUS
  }
}
