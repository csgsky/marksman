export const RECENTDIARY_INIT = 'RECENTDIARY_INIT'
export const RECENTDIARY_DATA = 'RECENTDIARY_DATA'
export const RECENTDIARY_LOADING_MORE = 'RECENTDIARY_LOADING_MORE'
export const RECENTDIARY_LOADING_MORE_DATA = 'RECENTDIARY_LOADING_MORE_DATA'
export const RECENTDIARY_LIKE = 'RECENTDIARY_LIKE'
export const RECENTDIARY_LIKE_SUCCESS = 'RECENTDIARY_LIKE_SUCCESS'

export function recentDiaryInit(page) {
  return {
    type: RECENTDIARY_INIT,
    isRefreshing: true,
    page
  }
}

export function recentDiaryData (data) {
  console.log('action  --->  RECENTDIARY_DATA')
  console.log('action  --->  RECENTDIARY_DATA diary length ' + data.diarys.length)
  return {
    type: RECENTDIARY_DATA,
    isRefreshing: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 6,
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
    hasMoreData: data.diarys.length >= 6
  }
}

export function rencentDiaryLike(payload) {
  console.log('action ---> RECENT_DIARY_LIKE')
  return {
    type: RECENTDIARY_LIKE,
    payload
  }
}

export function recentDiaryLikeSuccess(payload) {
  console.log('action ---> RECENT_DIARY_LIKE_SUCCESS')
  return {
    type: RECENTDIARY_LIKE_SUCCESS,
    payload
  }
}
