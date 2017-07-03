import * as types from '../actions/trashActions'

const initState = {
  isRefreshing: false,
  diaries: [],
  isLoadingMore: false,
  page: 0,
  hasMore: true
}

export default function trash (state = initState, action = {}) {
  switch (action.type) {
    case types.TRASH_INIT:
      return {
        ...state,
        isRefreshing: true
      }
    case types.TRASH_DATA:
      return {
        ...state,
        isRefreshing: false,
        diaries: action.diarys
      }
    case types.TRASH_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.TRASH_MORE_DATA:
      return {
        ...state,
        isLoadingMore: false,
        diaries: state.diaries.concat(action.diaries),
        hasMore: action.diaries.length >= 3,
        page: state.page + 1
      }
    case types.TRASH_DELETE_SUCCESS:
      return {
        ...state,
      }
    default:
      return state
  }
}
