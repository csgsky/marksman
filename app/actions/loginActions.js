export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'


export function login (sex, sign, nickname, tags) {
  return {
    type: LOGIN,
    sex: sex,
    sign: sign,
    nickname: nickname,
    tags: tags
  }
}

export function loginSuccess (it) {
  return {
    type: LOGIN_SUCCESS,
    it: it
  }
}
