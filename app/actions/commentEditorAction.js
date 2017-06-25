export const COMMENT_POST = 'COMMENT_POST'
export const COMMENT_POST_SUCCESS = 'COMMENT_POST_SUCCESS'
export const CLEAR_COMMENT_POST = 'CLEAR_COMMENT_POST'

export function commentPost(payload) {
  return {
    type: COMMENT_POST,
    payload
  }
}

export function commentPostSuccess(payload) {
  return {
    type: COMMENT_POST_SUCCESS,
    payload
  }
}

export function clearCommentPost() {
  return {
    type: CLEAR_COMMENT_POST
  }
}

