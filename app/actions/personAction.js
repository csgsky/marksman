export const PERSON_INIT = 'PERSON_INIT'
export const PERSON_DATA = 'PERSON_DATA'
export const PERSON_DIARY_MORE = 'PERSON_DIARY_MORE'
export const PERSON_DIARY_MORE_DATA = 'PERSON_DIARY_MORE_DATA'
export const PERSON_FOLLOW = 'PERSON_FOLLOW'
export const PERSON_FOLLOW_SUCCESS = 'PERSON_FOLLOW_SUCCESS'
export const PERSON_DIARY_LIKE = 'PERSON_DIARY_LIKE'
export const PERSON_DIARY_LIKE_SUCCESS = 'PERSON_DIARY_LIKE_SUCCESS'
export const CLEAR_PERSON_DATA = 'CLEAR_PERSON_DATA'

export function personInit (id) {
  return {
    type: PERSON_INIT,
    isRefreshing: true,
    id
  }
}

export function personData (data) {
  console.log('action  --->  PERSON_DATA')
  return {
    type: PERSON_DATA,
    person: data,
    isRefreshing: false
  }
}

export function personDiaryMore (page, id) {
  console.log('action ---> PERSON_DIARY_LOAD_MORE')
  return {
    type: PERSON_DIARY_MORE,
    isLoadingMore: true,
    page,
    id
  }
}

export function personDiaryMoreData (data) {
  return {
    type: PERSON_DIARY_MORE_DATA,
    isLoadingMore: false,
    diaries: data,
    hasMore: data.length >= 3
  }
}

export function personFollow(payload) {
  console.log('action ---> PERSON_FOLLOW')
  return {
    type: PERSON_FOLLOW,
    payload
  }
}

export function personFollowSuccess() {
  console.log('action ---> PERSON_FOLLOW_SUCCESS')
  return {
    type: PERSON_FOLLOW_SUCCESS
  }
}

export function personDiaryLike(payload) {
  console.log('action ---> PERSON_DIARY_LIKE')
  return {
    type: PERSON_DIARY_LIKE,
    payload
  }
}

export function personDiaryLikeSuccess(payload) {
  console.log('action ---> PERSON_DIARY_LIKE_SUCCESS')
  return {
    type: PERSON_DIARY_LIKE_SUCCESS,
    payload
  }
}

export function clearPersonData() {
  return {
    type: CLEAR_PERSON_DATA
  }
}
