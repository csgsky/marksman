import * as types from '../actions/diaryDetailAction'
import {COMMENT_POST_SUCCESS} from '../actions/commentEditorAction'

const initState = {
  isRefreshing: false,
  comments: undefined,
  isLoadingMore: false,
  page: 0,
  hasMore: true,
  likeSuccess: false,
  commentSuccess: false,
  deleteSuccess: false
}

export default function diaryDetail (state = initState, action = {}) {
  switch (action.type) {
    case types.DIARY_DETAIL_INIT:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return initState
    case types.DIARY_COMMENT_DATA:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return {
        ...state,
        isRefreshing: false,
        comments: action.comments
      }
    case types.DIARY_LIKE_SUCCESS:
      console.log('reducer ---> DIARY_LIKE_SUCCESS')
      return {
        ...state,
        likeSuccess: true
      }
    case types.DIARY_COMMENT_LIKE_SUCCESS:
      console.log('reducer ---> DIARY_COMMENT_LIKE_SUCCESS')
      return {
        ...state,
        comments: likeSuccess(state.comments, action.payload.index)
      }
    case types.DIARY_DETAIL_DELETE_DIARY_SUCCESS:
      console.log('reducer ---> DIARY_COMMENT_LIKE_SUCCESS')
      return {
        ...state,
        deleteSuccess: true
      }
    case types.DIARY_COMMENTS_LOAD_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.DIARY_COMMENTS_MORE_DATA:
      console.log('epic ---> DIARY_COMMENTS_MORE_DATA', action)
      return {
        ...state,
        isLoadingMore: false,
        hasMore: action.hasMore,
        page: state.page + 1,
        comments: state.comments.concat(action.comments)
      }
    case types.CLEAR_DIARY:
      return initState
    case COMMENT_POST_SUCCESS:
      return {
        ...state,
        commentSuccess: true
      }
    default:
      return state
  }
}

function likeSuccess(data, index) {
  const newData = data.slice(0)
  if (newData[index].my_like === 0) {
    newData[index].my_like = 1
    newData[index].like.num += 1
  } else if (newData[index].my_like === 1) {
    console.warn('hahahahhahah ' + newData[index].my_like)
    newData[index].my_like = 0
  }
  return newData
}
