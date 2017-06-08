import * as types from '../actions/lovedActions'

const initState = {
  isRefreshing: false,
  loved: [],
  isLoadingMore: false,
  page: 0
}


export default function lovedList (state = initState, action = {}) {
  switch (action.type) {
    case types.LOVED_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        page: action.page
      }
    case types.LOVED_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        loved: action.loved,
        hasMore: action.hasMore
      }
    case types.LOVED_MORE:
      return {
        ...state,
        isLoadingMore: action.isLoadingMore
      }
    case types.LOVED_MORE_DATA:
      return {
        ...state,
        isLoadingMore: action.isLoadingMore,
        loved: state.loved.concat(action.loved),
        hasMore: action.hasMore,
        page: state.page + 1
      }
    default:
      return state
  }
}
