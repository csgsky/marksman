import * as types from '../actions/myFollowTopicsAction'

const initState = {
  isRefreshing: false,
  topics: [],
  isEmpty: 0,
  isLoadingMore: false,
  page: 0,
  hasMore: true
}

export default function myFollowTopics (state = initState, action = {}) {
  switch (action.type) {
    case types.MY_FOLLOW_TOPICS_INIT:
      return {
        ...state,
        isRefreshing: false
      }
    case types.MY_FOLLOW_TOPICS_INIT_SUCCESS:
      return {
        ...state,
        isRefreshing: false,
        hasMore: !action.payload.isEmpty && action.payload.topics.length >= 10,
        isLoadingMore: false,
        page: 0,
        topics: action.payload.topics,
        isEmpty: action.payload.isEmpty
      }
    case types.MY_FOLLOW_TOPICS_LOAD_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MY_FOLLOW_TOPICS_MORE_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        topics: state.topics.concat(action.payload.topics || []),
        hasMore: action.payload.topics.length >= 10,
        page: state.page + 1
      }
    case types.MY_FOLLOW_TOPICS_FOLLOW_SUCCESS:
      return {
        ...state,
        topics: updateFollow(state.topics, action.payload.position),
      }
    default:
      return state
  }
}

function updateFollow (data, position) {
  if (!data || !data.length) {
    return data
  }
  const newData = data.slice(0)
  newData[position].my_focus = !newData[position].my_focus
  return newData
}
