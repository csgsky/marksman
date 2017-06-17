export const DIARY_COMMENT_INIT = 'DIARY_COMMENT_INIT'
export const DIARY_COMMENT_DATA = 'DIARY_COMMENT_DATA'


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
