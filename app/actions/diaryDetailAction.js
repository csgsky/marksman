export const DIARY_COMMENT_INIT = 'DIARY_COMMENT_INIT'
export const DIARY_COMMENT_DATA = 'DIARY_COMMENT_DATA'
export const DIARY_LIKE = 'DIARY_LIKE'
export const DIARY_COMMENT_LIKE = 'DIARY_COMMENT_LIKE'
export const DIARY_LIKE_SUCCESS = 'DIARY_LIKE_SUCCESS'
export const DIARY_COMMENT_LIKE_SUCCESS = 'DIARY_COMMENT_LIKE_SUCCESS'
export const CLEAR_DIARY = 'CLEAR_DIARY'


export function diaryCommentInit ({id, ownerId}) {
  console.warn('action  --->  DIARY_COMMENT_INIT')
  return {
    type: DIARY_COMMENT_INIT,
    id,
    ownerId,
  }
}

export function diaryCommentData (data) {
  console.log('action  --->  DIARY_COMMENT_DATA')
  return {
    type: DIARY_COMMENT_DATA,
    comments: data.comments
  }
}

export function diaryLike (payload) {
  console.log('action ---> DIARY_LIKE')
  return {
    type: DIARY_LIKE,
    payload
  }
}

export function diaryLikeSuccess(payload) {
  console.log('action ---> DIARY_LIKE_SUCCESS')
  return {
    type: DIARY_LIKE_SUCCESS,
    payload
  }
}

export function diaryCommentLike(payload) {
  console.log('action ---> DIARY_COMMENT_LIKE')
  return {
    type: DIARY_COMMENT_LIKE,
    payload
  }
}

export function diaryCommentLikeSuccess(payload) {
  console.log('action ---> DIARY_COMMENT_LIKE_SUCCESS')
  return {
    type: DIARY_COMMENT_LIKE_SUCCESS,
    payload
  }
}

export function clearDiary() {
  return {
    type: CLEAR_DIARY
  }
}
