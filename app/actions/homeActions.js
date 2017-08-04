export const HOME_INIT = 'HOME_INIT'
export const HOME_DATA = 'HOME_DATA'
export const HOME_LOADING_MORE = 'HOME_LOADING_MORE'
export const HOME_LOADING_MORE_DATA = 'HOME_LOADING_MORE_DATA'
export const HOME_VISITOR = 'HOME_VISITOR'

export function visitor () {
  return {
    type: HOME_VISITOR
  }
}
export function homeInit (page) {
  return {
    type: HOME_INIT,
    isRefreshing: true,
    page
  }
}

export function homeData (data) {
  // console.log('action  --->  HOME_DATA')
  // console.log('action  --->  HOME_DATA diary length ' + data.diarys.length)
  return {
    type: HOME_DATA,
    isRefreshing: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10,
    isLoadingMore: false
  }
}
export function homeLoadingMore (page) {
  return {
    type: HOME_LOADING_MORE,
    isLoadingMore: true,
    page
  }
}

export function homeLoadingMoreData (data) {
  return {
    type: HOME_LOADING_MORE_DATA,
    isLoadingMore: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10
  }
}
