import * as types from '../actions/loginActions'

const initState = {
  account: '',
  password: '',
  correctAccount: false,
  correctPassword: false,
  userId: '',
  securePassword: true,
}


export default function login (state = initState, action = {}) {
  switch (action.type) {
    case types.ACCOUNT_CHANGE:
      return {
        ...state,
        account: action.account,
        correctAccount: testMobile(action.account)
      }
    case types.PASSWORD_CHANGE:
      return {
        ...state,
        password: action.password,
        correctPassword: testPassword(action.password)
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        info: action.info
      }
    case types.LOGIN_CHANGE_PASSWORD_SECURE:
      return {
        ...state,
        securePassword: !state.securePassword
      }
    case types.LOGIN_INIT_PAGE:
      return initState
    default:
      return state
  }
}

function testMobile (mobile) {
  if ((/^1[3|5|7|8][0-9]\d{4,8}$/.test(mobile)) && mobile.length === 11) {
    return true
  } else {
    return false
  }
}

function testPassword (password) {
  if (password.length >= 6) {
    return true
  } else {
    return false
  }
}

