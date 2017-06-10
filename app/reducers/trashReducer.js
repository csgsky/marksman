import * as types from '../actions/trashActions'

const initState = {
  isRefreshing: false,
  diaries: [],
  isLoadingMore: false,
  page: 0
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
    default:
      return state
  }
}
