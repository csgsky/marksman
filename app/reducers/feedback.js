import * as types from '../actions/feedback'

const initState = {
  submitting: false,
  success: false
}

export default function feedback (state = initState, action = {}) {
  switch (action.type) {
    case types.FEEDBACK:
      return {
        ...state,
        submitting: true
      }
    case types.FEEDBACK_SUCCESS:
      return {
        ...state,
        submitting: false,
        success: true
      }
    case types.CLEAR_FEEDBACK:
      return initState
    default:
      return state
  }
}
