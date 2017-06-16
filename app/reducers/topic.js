import * as types from '../actions/topic'

const initState = {
  isRefreshing: false,
  topic: {},
  comments: [],
  isLoadingMore: false,
  page: 0,
  hasMore: true
}

export default function topic (state = initState, action = {}) {
  switch (action.type) {
    case types.TOPIC_INIT:
      return {
        ...state,
        isRefreshing: true
      }
    case types.TOPIC_DATA:
      return {
        ...state,
        isRefreshing: false,
        topic: action.topic,
        comments: action.comments
      }
    case types.TOPIC_COMMENTS_LOAD_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.TOPIC_COMMENTS_MORE_DATA:
      console.log('action ---> TOTOPIC_COMMENTS_MORE_DATA', action)
      return {
        ...state,
        isLoadingMore: false,
        hasMore: action.hasMore,
        page: state.page + 1,
        comments: state.comments.concat(action.comments)
      }
    default:
      return state
  }
}
