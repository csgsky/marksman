import Toast from 'react-native-root-toast'

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'
export const REGISTER_GET_CODE = 'REGISTER_GET_CODE'
export const REGISTER_CODE_SUCCESS = 'REGISTER_CODE_SUCCESS'
export const REGISTER_NICKNAME_CHANGE = 'REGISTER_NICKNAME_CHANGE'
export const REGISTER_PASSWORD_CHANGE = 'REGISTER_PASSWORD_CHANGE'
export const REGISTER_VER_CHANGE = 'REGISTER_VER_CHANGE'
export const REGISTER_CODE_DATA = 'REGISTER_CODE_DATA'
export const REGISTER_CODE_TIME_OVER = 'REGISTER_CODE_TIME_OVER'
export const REGISTER_CODE_COUNTER = 'REGISTER_CODE_COUNTER'
export const CLEAR_REGISTER_DATA = 'CLEAR_REGISTER_DATA'
export const REGISTER_CHANGE_SECURE = 'REGISTER_CHANGE_SECURE'
export function register (account, password, message, pageType) {
  return {
    type: REGISTER,
    account,
    password,
    message,
    pageType
  }
}

export function registerSuccess (userId) {
  return {
    type: REGISTER_SUCCESS,
    userId
  }
}

export function registerError (returnMsg) {
  Toast.show(returnMsg, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: REGISTER_ERROR,
    returnMsg
  }
}

export function getVerCode (account, pageType) {
  return {
    type: REGISTER_GET_CODE,
    account,
    pageType
  }
}

export function codeCounter (it) {
  return {
    type: REGISTER_CODE_COUNTER,
    it
  }
}

export function codeTimeOver () {
  return {
    type: REGISTER_CODE_TIME_OVER
  }
}

export function codeData () {
  return {
    type: REGISTER_CODE_DATA
  }
}

export function codeSuccess () {
  return {
    type: REGISTER_CODE_SUCCESS
  }
}

export function nicknameChange (username) {
  return {
    type: REGISTER_NICKNAME_CHANGE,
    username
  }
}

export function passwordChange (password) {
  return {
    type: REGISTER_PASSWORD_CHANGE,
    password
  }
}

export function verCodeChange (code) {
  return {
    type: REGISTER_VER_CHANGE,
    code
  }
}

export function clearData () {
  return {
    type: CLEAR_REGISTER_DATA
  }
}

export function changeSecure () {
  return {
    type: REGISTER_CHANGE_SECURE
  }
}
