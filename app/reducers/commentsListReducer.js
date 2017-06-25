import * as types from '../actions/commentListActions'
import {COMMENT_POST, COMMENT_POST_SUCCESS, CLEAR_COMMENT_POST} from '../actions/commentEditorAction'

const initialState = {
  isLoadingMore: false,
  isRefreshing: false,
  hasMore: true,
  page: 0,
  isPostingComment: false,
  success: false,
  count: NaN
}

export default function commentsList(state = initialState, action = {}) {
  switch (action.type) {
    case types.COMMENTS_LIST_INIT:
      return {
        ...state,
        isRefreshing: true,
        comments: [action.payload.mainComment]
      }
    case types.COMMENTS_LIST_INIT_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(action.payload.recomments),
        isRefreshing: false,
        count: action.payload.count
      }
    case types.COMMENTS_LIST_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.COMMENTS_LIST_MORE_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(action.payload.recomments),
        isLoadingMore: false,
        hasMore: action.payload.recomments.length >= 10,
        page: state.page + 1
      }
    case types.CLEAR_COMMENTS_LIST:
      return initialState
    case types.COMMENTS_LIST_LIKE_SUCCESS:
      console.log('epic ---> COMMENTS_LIST_LIKE_SUCCESS')
      return {
        ...state,
        comments: likeCommentSuccess(state.comments, action.payload.index)
      }
    case COMMENT_POST:
      return {
        ...state,
        success: false,
        isPostingComment: true,
      }
    case COMMENT_POST_SUCCESS:
      return {
        ...state,
        success: true,
        isPostingComment: false
      }
    case CLEAR_COMMENT_POST:
      return {
        ...state,
        success: false,
        isPostingComment: false
      }
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
