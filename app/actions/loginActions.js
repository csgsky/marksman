export const LOGIN = 'LOGIN'
export const ACCOUNT_CHANGE = 'ACCOUNT_CHANGE'
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const INIT_PAGE = 'INIT_PAGE'

export function initPage () {
  return {
    type: INIT_PAGE
  }
}
export function usernameChagnge (account) {
  return {
    type: ACCOUNT_CHANGE,
    account: account
  }
}

export function passwordChange (password) {
  return {
    type: PASSWORD_CHANGE,
    password: password
  }
}

export function login (account, password) {
  return {
    type: LOGIN,
    account: account,
    password: password
  }
}

export function loginSuccess (info, userId) {
  console.warn('action ====> loginSuccess ' + userId)
  return {
    type: LOGIN_SUCCESS,
    info: info,
    userId: userId
  }
}

export function loginError (errorMsg) {
  console.warn('action ====> loginError: ' + errorMsg)
  return {
    type: LOGIN_ERROR,
    errorMsg: errorMsg
  }
}