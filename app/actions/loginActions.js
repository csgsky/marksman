export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'


export function login (sex, sign, nickname, tags) {
  console.log('action  --->  LOGIN')
  console.log('sex  ---> ' + sex)
  console.log('sign  ---> ' + sign)
  console.log('nickname  ---> ' + nickname)
  console.log('tags  ---> ' + tags)
  return {
    type: LOGIN,
    sex: sex,
    sign: sign,
    nickname: nickname,
    tags: tags
  }
}

export function loginSuccess (it) {
  console.warn('action ==> ' + it)
  return {
    type: LOGIN_SUCCESS,
    it: it
  }
}
