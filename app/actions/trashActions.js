import PubSub from 'pubsub-js'
import Toast from 'react-native-root-toast'

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
  PubSub.publish('refreshTrashList')
  Toast.show('恢复成功，请在浅记里查看~', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: TRASH_RECOVER_SUCCESS
  }
}

export function trashDeleteSuccess () {
  PubSub.publish('refreshTrashList')
  Toast.show('日记已彻底删除~', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: TRASH_DELETE_SUCCESS
  }
}

