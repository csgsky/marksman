export const RECENTDIARY_INIT = 'RECENTDIARY_INIT'
export const RECENTDIARY_DATA = 'RECENTDIARY_DATA'
export const RECENTDIARY_LOADING_MORE = 'RECENTDIARY_LOADING_MORE'
export const RECENTDIARY_LOADING_MORE_DATA = 'RECENTDIARY_LOADING_MORE_DATA'
export const RECENTDIARY_LIKE = 'RECENTDIARY_LIKE'
export const RECENTDIARY_LIKE_SUCCESS = 'RECENTDIARY_LIKE_SUCCESS'
export const RECENTDIARY_UPDATE_LIKE_COUNT = 'RECENTDIARY_UPDATE_LIKE_COUNT'
export const RECENTDIARY_UPDATE_COMMENT = 'RECENTDIARY_UPDATE_COMMENT'

export function recentDiaryInit(page) {
  return {
    type: RECENTDIARY_INIT,
    isRefreshing: true,
    page
  }
}

export function recentDiaryData (data) {
  return {
    type: RECENTDIARY_DATA,
    isRefreshing: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10,
    isLoadingMore: false
  }
}

export function recentDiaryLoadingMore(page) {
  return {
    type: RECENTDIARY_LOADING_MORE,
    isLoadingMore: true,
    page
  }
}

export function recentDiaryLoadingMoreData (data) {
  return {
    type: RECENTDIARY_LOADING_MORE_DATA,
    isLoadingMore: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10
  }
}

export function rencentDiaryLike(payload) {
  return {
    type: RECENTDIARY_LIKE,
    payload
  }
}

export function recentDiaryLikeSuccess(payload) {
  return {
    type: RECENTDIARY_LIKE_SUCCESS,
    payload
  }
}

export function updateDiaryLike (diaryId) {
  return {
    type: RECENTDIARY_UPDATE_LIKE_COUNT,
    diaryId
  }
}

export function updateDiaryComment (diaryId) {
  return {
    type: RECENTDIARY_UPDATE_COMMENT,
    diaryId
  }
}
