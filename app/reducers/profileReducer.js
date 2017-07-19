import * as types from '../actions/profile'

const initState = {
  info: {},
  success: false
}

export default function profile (state = initState, action = {}) {
  switch (action.type) {
    case types.PERSONAL_INFO_DATA:
      console.warn('personal center ==> ', action.info.nickname)
      return {
        ...state,
        info: action.info
      }
    case types.PERSONAL_SUBMIT_USERINFO_SUCCESS:
      console.warn('reducer personal info ==> PERSONAL_SUBMIT_USERINFO_SUCCESS')
      return {
        ...state,
        info: action.newInfo,
        success: true
      }
    case types.PERSONAL_INFO_SUBMIT_INIT:
      return {
        ...state,
        success: false
      }
    case types.MESSAGE_PROFILECENER_REMINDER_DATA:
      console.log('reducer message ', action.message)
      return {
        ...state,
        message: action.message
      }
    case types.MESSAGE_PROFILE_ITEM_CLICK:
      console.log('reducer MESSAGE_PROFILE_ITEM_CLICK ', action.value)
      return {
        ...state,
        message: {
          ...state.message,
          sysmsg_rd: 0
        }
      }
    default:
      return state
  }
}
