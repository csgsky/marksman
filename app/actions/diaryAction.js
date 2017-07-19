// export const DIARY_COMMENT_INIT = 'DIARY_COMMENT_INIT'
// export const DIARY_COMMENT_DATA = 'DIARY_COMMENT_DATA'
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

export function writeDiaryInit (payload) {
  console.log('action  --->  WRITE_DIARY_INIT')
  return {
    type: WRITE_DIARY_INIT,
    payload
  }
}

export function writeDiaryColorChange (payload) {
  console.log('action  --->  WRITE_DIARY_INIT')
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
  return {
    type: WRITE_DIARY_DELETE_PHOTO
  }
}

export function changeDiaryState () {
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

export function postDiary (payload) {
  return {
    type: WRITE_DIARY_POST_DIARY,
    payload
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
