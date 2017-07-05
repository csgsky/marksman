import * as types from '../actions/profile'

const initState = {
  info: null
}

export default function profile (state = initState, action = {}) {
  switch (action.type) {
    case types.PERSONAL_INFO_DATA:
      console.warn('personal center ==> ', action.info.nickname)
      return {
        ...state,
        info: action.info
      }
    default:
      return state
  }
}
