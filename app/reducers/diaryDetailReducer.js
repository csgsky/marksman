import * as types from '../actions/diaryAction'

const initState = {
  isRefreshing: true,
  comments: [],
  isLoadingMore: false,
  page: 0,
  hasMore: true
}

export default function diaryDetail (state = initState, action = {}) {
  switch (action.type) {
    case types.DIARY_DETAIL_INIT:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return {
        ...state,
        isRefreshing: true
      }
    case types.DIARY_COMMENT_DATA:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return {
        ...state,
        isRefreshing: false,
        comments: action.comments
      }
    default:
      return state
  }
}
