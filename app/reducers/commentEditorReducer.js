import * as types from '../actions/commentEditorAction'

const initState = {
  isLoading: false,
  success: false
}

export default function commentEditor (state = initState, action = {}) {
  switch (action.type) {
    case types.COMMENT_POST:
      return {
        ...state,
        isLoading: true
      }
    case types.COMMENT_POST_SUCCESS:
      return {
        isLoading: false,
        success: true
      }
    case types.CLEAR_COMMENT_POST:
      return initState
    default:
      return state
  }
}
