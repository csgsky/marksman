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
export const CLEAR_DATA = 'CLEAR_DATA'
export function register (account, password, message, sex, sign, nickname, tags) {
  console.log('action REGISTER ===> ')
  return {
    type: REGISTER,
    account: account,
    password: password,
    message: message,
    sex: sex,
    sign: sign,
    nickname: nickname,
    tags: tags
  }
}

export function registerSuccess (userId) {
  console.log('action REGISTER_SUCCESS userId ===> ' + userId)
  return {
    type: REGISTER_SUCCESS,
    userId: userId
  }
}

export function registerError (returnMsg) {
  console.log('action REGISTER_Error ===> ' + returnMsg)
  return {
    type: REGISTER_ERROR,
    returnMsg: returnMsg
  }
}

export function getVerCode (account) {
  console.log('action account REGISTER_GET_CODE ===> ' + account)
  return {
    type: REGISTER_GET_CODE,
    account: account
  }
}

export function codeCounter (it) {
  console.log('action REGISTER_CODE_COUNTER ===> ')
  return {
    type: REGISTER_CODE_COUNTER,
    it: it
  }
}

export function codeTimeOver () {
  console.log('action REGISTER_CODE_TIME_OVER ===> ')
  return {
    type: REGISTER_CODE_TIME_OVER
  }
}

export function codeData () {
  console.log('action REGISTER_CODE_DATA ===> ')
  return {
    type: REGISTER_CODE_DATA
  }
}

export function codeSuccess () {
  console.log('action codeSuccess ===> ')
  return {
    type: REGISTER_CODE_SUCCESS
  }
}

export function nicknameChange (username) {
  return {
    type: REGISTER_NICKNAME_CHANGE,
    username: username
  }
}

export function passwordChange (password) {
  return {
    type: REGISTER_PASSWORD_CHANGE,
    password: password
  }
}

export function verCodeChange (code) {
  return {
    type: REGISTER_VER_CHANGE,
    code: code
  }
}

export function clearData () {
  return {
    type: CLEAR_DATA
  }
}
