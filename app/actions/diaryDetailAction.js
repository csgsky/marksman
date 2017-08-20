export const DIARY_COMMENT_INIT = 'DIARY_COMMENT_INIT'
export const DIARY_COMMENT_DATA = 'DIARY_COMMENT_DATA'
export const DIARY_COMMENTS_LOAD_MORE = 'DIARY_COMMENTS_LOAD_MORE'
export const DIARY_COMMENTS_MORE_DATA = 'DIARY_COMMENTS_MORE_DATA'
export const DIARY_LIKE = 'DIARY_LIKE'
export const DIARY_COMMENT_LIKE = 'DIARY_COMMENT_LIKE'
export const DIARY_LIKE_SUCCESS = 'DIARY_LIKE_SUCCESS'
export const DIARY_COMMENT_LIKE_SUCCESS = 'DIARY_COMMENT_LIKE_SUCCESS'
export const CLEAR_DIARY = 'CLEAR_DIARY'
export const DIARY_DETAIL_DELETE_DIARY = 'DIARY_DETAIL_DELETE_DIARY'
export const DIARY_DETAIL_DELETE_DIARY_SUCCESS = 'DIARY_DETAIL_DELETE_DIARY_SUCCESS'

export function diaryCommentInit ({id, ownerId}) {
  return {
    type: DIARY_COMMENT_INIT,
    id,
    ownerId,
  }
}

export function diaryCommentData (data) {
  return {
    type: DIARY_COMMENT_DATA,
    comments: data.comments
  }
}
export function diaryCommentsLoadMore ({ownerId, page, id}) {
  return {
    type: DIARY_COMMENTS_LOAD_MORE,
    ownerId,
    page,
    id
  }
}

export function diaryCommentsMoreData (data) {
  return {
    type: DIARY_COMMENTS_MORE_DATA,
    isLoadingMore: false,
    comments: data,
    hasMore: data.length >= 10
  }
}

export function diaryLike (payload) {
  return {
    type: DIARY_LIKE,
    payload
  }
}

export function diaryLikeSuccess(payload) {
  return {
    type: DIARY_LIKE_SUCCESS,
    payload
  }
}

export function diaryCommentLike(payload) {
  return {
    type: DIARY_COMMENT_LIKE,
    payload
  }
}

export function diaryCommentLikeSuccess(payload) {
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

export function deleteDiary (payload) {
  return {
    type: DIARY_DETAIL_DELETE_DIARY,
    payload
  }
}

export function deleteDiarySuccess () {
  return {
    type: DIARY_DETAIL_DELETE_DIARY_SUCCESS
  }
}
