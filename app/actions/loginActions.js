export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'


export function login (account, password) {
  console.log('action  --->  LOGIN')
  console.log('account  ---> ' + account)
  console.log('action  ---> ' + password)
  return {
    type: LOGIN,
    account: account,
    password: password
  }
}

export function loginSuccess (token, slug) {
  console.log('action ---> LOGIN_SUCCESS')
  console.log('action ---> token ' + token)
  console.log('action ---> slug ' + slug)
  return {
    type: LOGIN_SUCCESS,
    token: token,
    slug: slug
  }
}
