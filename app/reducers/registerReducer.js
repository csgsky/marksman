import * as types from '../actions/registerAction'
import Rx from 'rxjs'
const initState = {
  username: '',
  password: '',
  code: '',
  correctUsername: false,
  correctPassword: false,
  correctCode: false,
  isCounting: false,
  btnCodeText: '获取验证码'
}


export default function register (state = initState, action = {}) {
  switch (action.type) {
    case types.REGISTER_NICKNAME_CHANGE:
      return {
        ...state,
        username: action.username,
        correctUsername: testMobile(action.username)
      }
    case types.REGISTER_PASSWORD_CHANGE:
      console.warn('密码  ==> ' + action.password)
      console.warn('是正确格式的密码吗？ ==> ' + testPassword(action.password))
      return {
        ...state,
        password: action.password,
        correctPassword: testPassword(action.password)
      }
    case types.REGISTER_VER_CHANGE:
      return {
        ...state,
        code: action.code,
        correctCode: action.code.length === 6
      }
    case types.REGISTER_CODE_COUNTER:
      return {
        ...state,
        counter: 60 - action.it,
        btnCodeText: 60 - action.it + 's后重新获取',
        isCounting: true
      }
    case types.REGISTER_CODE_TIME_OVER:
      return {
        ...state,
        btnCodeText: '重新获取',
        isCounting: false
      }
    default:
      return state
  }
}

function testMobile (mobile) {
  if ((/^1[3|5][0-9]\d{4,8}$/.test(mobile)) && mobile.length === 11) {
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
