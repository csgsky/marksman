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
export function diaryCommentsLoadMore ({ownerId, page, id}) {
  console.log('action ---> Diary_COMMENTS_LOAD_MORE')
  return {
    type: DIARY_COMMENTS_LOAD_MORE,
    ownerId,
    page,
    id
  }
}

export function diaryCommentsMoreData (data) {
  console.log('action ---> DIARY_COMMENTS_MORE_DATA')
  return {
    type: DIARY_COMMENTS_MORE_DATA,
    isLoadingMore: false,
    comments: data,
    hasMore: data.length >= 10
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

export function deleteDiary (payload) {
  return {
    type: DIARY_DETAIL_DELETE_DIARY,
    payload
  }
}

export function deleteDiarySuccess () {
  console.warn('action delete success')
  return {
    type: DIARY_DETAIL_DELETE_DIARY_SUCCESS
  }
}
