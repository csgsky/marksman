import * as types from '../actions/common'

const initState = {
  error: '',
}

export default function common(state = initState, action = {}) {
  switch (action.type) {
    case types.SHOW_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state;
  }
}
