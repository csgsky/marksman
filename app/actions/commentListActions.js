export const COMMENTS_LIST_INIT = 'COMMENTS_LIST_INIT'
export const COMMENTS_LIST_MORE = 'COMMENTS_LIST_MORE'
export const COMMENTS_LIST_INIT_SUCCESS = 'COMMENTS_LIST_INIT_SUCCESS'
export const COMMENTS_LIST_MORE_SUCCESS = 'COMMENTS_LIST_MORE_SUCCESS'
export const CLEAR_COMMENTS_LIST = 'CLEAR_COMMENTS_LIST'
export const COMMENTS_LIST_LIKE = 'COMMENTS_LIST_LIKE'
export const COMMENTS_LIST_LIKE_SUCCESS = 'COMMNETS_LIST_LIKE_SUCCESS'
export const COMMENTS_LIST_COMMENT_POST = 'COMMENTS_LIST_COMMENT_POST'
export const COMMENTS_LIST_COMMENT_POST_SUCCESS = 'COMMENTS_LIST_COMMENT_POST_SUCCESS'

export function commentsListInit(payload) {
  console.log('COMMENT_LIST_INIT')
  return {
    type: COMMENTS_LIST_INIT,
    payload
  }
}

export function commentsListInitSuccess(payload) {
  return {
    type: COMMENTS_LIST_INIT_SUCCESS,
    payload
  }
}

export function commentsListMore(payload) {
  return {
    type: COMMENTS_LIST_MORE,
    payload
  }
}

export function commentsListMoreSuccess(payload) {
  return {
    type: COMMENTS_LIST_MORE_SUCCESS,
    payload
  }
}

export function clearCommentsList() {
  return {
    type: CLEAR_COMMENTS_LIST
  }
}

export function commentsListLike(payload) {
  return {
    type: COMMENTS_LIST_LIKE,
    payload
  }
}

export function commentsListLikeSuccess(payload) {
  return {
    type: COMMENTS_LIST_LIKE_SUCCESS,
    payload
  }
}

export function commentsListCommentPost(payload) {
  console.log('action ===> COMMENTS_LIST_COMMENT_POST')
  return {
    type: COMMENTS_LIST_COMMENT_POST,
    payload
  }
}

export function commentsListCommentPostSuccess(payload) {
  console.log('action ===> COMMENTS_LIST_COMMENT_POST_SUCCESS')
  return {
    type: COMMENTS_LIST_COMMENT_POST_SUCCESS,
    payload
  }
}
