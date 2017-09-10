
import Toast from 'react-native-root-toast'

export const LOGIN = 'LOGIN'
export const ACCOUNT_CHANGE = 'ACCOUNT_CHANGE'
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_INIT_PAGE = 'LOGIN_INIT_PAGE'
export const LOGIN_CHANGE_PASSWORD_SECURE = 'LOGIN_CHANGE_PASSWORD_SECURE'
export const THIRD_LOGIN = 'THIRD_LOGIN'
export function initPage () {
  return {
    type: LOGIN_INIT_PAGE
  }
}
export function usernameChagnge (account) {
  return {
    type: ACCOUNT_CHANGE,
    account
  }
}

export function passwordChange (password) {
  return {
    type: PASSWORD_CHANGE,
    password
  }
}

export function login (account, password) {
  return {
    type: LOGIN,
    account,
    password
  }
}

export function thirdLogin (loginType, code, openId, nickname, avtar) {
  return {
    type: THIRD_LOGIN,
    loginType,
    code,
    openId,
    nickname,
    avtar
  }
}

export function loginSuccess (info, userId) {
  console.warn('action ====> loginSuccess ' + userId)
  return {
    type: LOGIN_SUCCESS,
    info,
    userId
  }
}

export function changePasswordSecure () {
  console.warn('action change password secure ')
  return {
    type: LOGIN_CHANGE_PASSWORD_SECURE
  }
}

export function loginError (errorMsg) {
  Toast.show('用户名或密码错误！', {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: LOGIN_ERROR,
    errorMsg
  }
}
