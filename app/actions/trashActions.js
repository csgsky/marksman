import PubSub from 'pubsub-js'

export const TRASH_INIT = 'TRASH_INIT'
export const TRASH_DATA = 'TRASH_DATA'
export const TRASH_MORE = 'TRASH_MORE'
export const TRASH_MORE_DATA = 'TRASH_MORE_DATA'
export const RECOVER_DIARY = 'RECOVER_DIARY'
export const TRASH_DELETE_SUCCESS = 'TRASH_DELETE_SUCCESS'
export const TRASH_UPDATE_TRASH_LIST = 'TRASH_UPDATE_TRASH_LIST'
export const TRASH_RECOVER_SUCCESS = 'TRASH_RECOVER_SUCCESS'
export function trashInit () {
  return {
    type: TRASH_INIT,
    isRefreshing: true
  }
}

export function trashData (data) {
  console.log('action  --->  TRASH_DATA')
  console.log('action  --->  TRASH_DATA diary length ' + data.diarys.length)
  return {
    type: TRASH_DATA,
    isRefreshing: false,
    diarys: data.diarys
  }
}

export function trashMore (page) {
  console.log('action ---> LOADING_MORE_TRASH')
  return {
    type: TRASH_MORE,
    isLoadingMore: true,
    page
  }
}

export function trashMoreData (data) {
  return {
    type: TRASH_MORE_DATA,
    isLoadingMore: false,
    diaries: data.diarys,
    hasMore: data.diarys.length >= 3
  }
}

export function recoverDiary(payload) {
  return {
    type: RECOVER_DIARY,
    payload
  }
}

export function recoverDiarySuccess () {
  console.warn('trash recovery success')

  return {
    type: TRASH_RECOVER_SUCCESS
  }
}

export function trashDeleteSuccess () {
  PubSub.publish('refreshTrashList')
  console.warn('trash delete success')
  return {
    type: TRASH_DELETE_SUCCESS
  }
}

