import * as types from '../actions/topic'

const initState = {
  isRefreshing: false,
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
        isRefreshing: false
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
      console.log('epic ---> TOTOPIC_COMMENTS_MORE_DATA', action)
      return {
        ...state,
        isLoadingMore: false,
        hasMore: action.hasMore,
        page: state.page + 1,
        comments: state.comments.concat(action.comments)
      }
    case types.TOPIC_FOLLOW_SUCCESS:
      console.log('epic ---> TOPIC__FOLLOW_SUCCESS')
      return {
        ...state,
        topic: {...state.topic, my_focus: 1}
      }
    case types.TOPIC_UNFOLLOW_SUCCESS:
      console.log('epic ---> TOPIC_UNFOLLOW_SUCCESS')
      return {
        ...state,
        topic: {...state.topic, my_focus: 0}
      }
    case types.TOPIC_COMMENT_LIKE_SUCCESS:
      console.log('epic ---> TOPIC_COMMENT_LIEK_SUCCESS')
      return {
        ...state,
        comments: likeCommentSuccess(state.comments, action.index)
      }
    case types.TOPIC_LIKE_SUCCESS:
      console.log('epic ---> TOPIC_LIKE_SUCCESS')
      return {
        ...state,
        topic: {...state.topic, my_like: 1, like: {num: state.topic.like.num + 1}}
      }
    case types.TOPIC_DETAIL_CLEAR_DATA:
      return initState
    default:
      return state
  }
}

function likeCommentSuccess(comments, index) {
  const newComments = comments.slice(0)
  if (newComments[index].my_like === 0) {
    newComments[index].my_like = 1
    newComments[index].like.num += 1
  } else if (newComments[index].my_like === 1) {
    console.warn('hahahahhahah ' + newComments[index].my_like)
    newComments[index].my_like = 0
  }
  return newComments
}
