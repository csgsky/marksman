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
      console.log(action.topic, action.comments)
      return {
        ...state,
        isRefreshing: false,
        topic: action.topic,
        comments: action.comments
      }
    default:
      return state
  }
}
