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
export function register (sex, sign, nickname, tags) {
  return {
    type: REGISTER,
    sex: sex,
    sign: sign,
    nickname: nickname,
    tags: tags
  }
}

export function registerSuccess (it) {
  return {
    type: REGISTER_SUCCESS,
    it: it
  }
}

export function getVerCode () {
  return {
    type: REGISTER_GET_CODE
  }
}

export function codeCounter (it) {
  return {
    type: REGISTER_CODE_COUNTER,
    it: it
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
