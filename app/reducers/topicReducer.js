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
        page: 0
      }
    case types.TOPICS_DATA:
      return {
        ...state,
        isRefreshing: false,
        talks: action.talks,
        hasMore: action.talks.length >= 10
      }
    case types.TOPICS_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.TOPICS_MORE_DATA:
      return {
        ...state,
        isLoadingMore: false,
        talks: state.talks.concat(action.talks),
        hasMore: action.talks.length >= 10,
        page: state.page + 1
      }
    case types.TOPIC_LIST_CLEAR_PAGE_DATA:
      return {
        ...initState
      }
    default:
      return state
  }
}
