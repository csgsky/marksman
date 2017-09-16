import {NativeModules} from 'react-native'

export const HOTDIARY_INIT = 'HOTDIARY_INIT'
export const HOTDIARY_DATA = 'HOTDIARY_DATA'
export const HOTDIARY_LOADING_MORE = 'HOTDIARY_LOADING_MORE'
export const HOTDIARY_LOADING_MORE_DATA = 'HOTDIARY_LOADING_MORE_DATA'
export const HOTDIARY_LIKE = 'HOTDIARY_LIKE'
export const HOTDIARY_LIKE_SUCCESS = 'HOTDIARY_LIKE_SUCCESS'
export const HOTDIARY_UPDATE_LIKE_COUNT = 'HOTDIARY_UPDATE_LIKE_COUNT'
export const HOTDIARY_UPDATE_COMMENT = 'HOTDIARY_UPDATE_COMMENT'
export function hotDiaryInit (page, timeStap) {
  return {
    type: HOTDIARY_INIT,
    isRefreshing: true,
    page,
    timeStap
  }
}

export function hotDiaryData (data) {
  return {
    type: HOTDIARY_DATA,
    isRefreshing: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10
  }
}

export function hotDiaryLoadingMore (page, timeStap) {
  return {
    type: HOTDIARY_LOADING_MORE,
    isLoadingMore: true,
    page,
    timeStap
  }
}

export function hotDiaryLoadingMoreData (data) {
  return {
    type: HOTDIARY_LOADING_MORE_DATA,
    isLoadingMore: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10
  }
}
export function hotDiaryLike(payload) {
  return {
    type: HOTDIARY_LIKE,
    payload
  }
}

export function hotDiaryLikeSuccess(payload) {
  NativeModules.TCAgent.trackSingle('足印-点赞成功')
  return {
    type: HOTDIARY_LIKE_SUCCESS,
    payload
  }
}

export function updateDiaryLike (diaryId) {
  return {
    type: HOTDIARY_UPDATE_LIKE_COUNT,
    diaryId
  }
}

export function updateDiaryComment (diaryId) {
  return {
    type: HOTDIARY_UPDATE_COMMENT,
    diaryId
  }
}
