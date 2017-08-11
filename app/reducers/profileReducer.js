import * as types from '../actions/profile'

const initState = {
  info: {},
  success: false
}

export default function profile (state = initState, action = {}) {
  switch (action.type) {
    case types.PERSONAL_INFO_DATA:
      return {
        ...state,
        info: action.info
      }
    case types.PERSONAL_SUBMIT_USERINFO_SUCCESS:
      return {
        ...state,
        info: action.avtar === null ? action.newInfo : {
          ...state.info
        },
        success: true
      }
    case types.PERSONAL_SUBMIT_USERINFO:
      return {
        ...state,
        info: action.avtar === null ? state.info : {
          ...state.info,
          avtar: action.avtar
        }
      }
    case types.PERSONAL_INFO_SUBMIT_INIT:
      return {
        ...state,
        success: false
      }
    case types.MESSAGE_PROFILECENER_REMINDER_DATA:
      return {
        ...state,
        message: action.message
      }
    case types.MESSAGE_PROFILE_ITEM_CLICK:
      return {
        ...state,
        message: {
          ...state.message,
          sysmsg_rd: 0
        }
      }
    case types.MINE_DISMISS_MINE_RED:
      return {
        ...state,
        message: {
          ...state.message,
          mymsg_rd: 0
        }
      }
    default:
      return state
  }
}
