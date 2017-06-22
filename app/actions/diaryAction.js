export const DIARY_COMMENT_INIT = 'DIARY_COMMENT_INIT'
export const DIARY_COMMENT_DATA = 'DIARY_COMMENT_DATA'
export const WRITE_DIARY_INIT = 'WRITE_DIARY_INIT'

export function diaryCommentInit ({id, ownerId}) {
  console.warn('action  --->  DIARY_COMMENT_INIT')
  return {
    type: DIARY_COMMENT_INIT,
    isRefreshing: true,
    id,
    ownerId,
  }
}

export function diaryCommentData (data) {
  console.log('action  --->  COLLECTIONS_DATA')
  return {
    type: DIARY_COMMENT_DATA,
    isRefreshing: false,
    comments: data.comments
  }
}

export function writeDiaryInit (payload) {
  console.log('action  --->  WRITE_DIARY_INIT')
  return {
    type: WRITE_DIARY_INIT,
    payload
  }
}
