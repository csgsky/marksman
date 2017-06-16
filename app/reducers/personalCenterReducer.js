import * as types from '../actions/personalCenterAction'

const initState = {
  info: ''
}

export default function personalCenter (state = initState, action = {}) {
  switch (action.type) {
    case types.PERSONAL_INFO_DATA:
      return {
        ...state,
        info: action.info
      }
    default:
      return state
  }
}
