export const DIARY_DETAIL_INIT = 'DIARY_DETAIL_INIT'
export const DIARY_DETAIL_DATA = 'DIARY_DETAIL_DATA'


export function diaryCommentInit () {
  console.warn('action  --->  COLLECTIONS_DATA')
  return {
    type: DIARY_DETAIL_INIT,
    isRefreshing: true
  }
}

export function diaryCommentData (comment) {
  console.log('action  --->  COLLECTIONS_DATA')
  return {
    type: DIARY_DETAIL_DATA,
    isRefreshing: false,
    comment: comment
  }
}
