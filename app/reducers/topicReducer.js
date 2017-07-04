import * as types from '../actions/topicsAction'

const initState = {
  isRefreshing: false,
  talks: [],
  isLoadingMore: false,
  page: 0
}


export default function talkList (state = initState, action = {}) {
  switch (action.type) {
    case types.TOPICS_INIT:
      return {
        ...state,
        isRefreshing: false,
        page: action.page
      }
    case types.TOPICS_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        talks: action.talks,
        hasMore: action.hasMore
      }
    case types.TOPICS_MORE:
      return {
        ...state,
        isLoadingMore: action.isLoadingMore
      }
    case types.TOPICS_MORE_DATA:
      return {
        ...state,
        isLoadingMore: action.isLoadingMore,
        talks: state.talks.concat(action.talks),
        hasMore: action.hasMore,
        page: state.page + 1
      }
    default:
      return state
  }
}
