export const HOME_INIT = 'HOME_INIT'
export const HOME_DATA = 'HOME_DATA'


export function homeInit (token) {
  console.log('action  --->  HOME')
  console.log('action  --->  HOME_TOKEN:' + token)
  return {
    type: HOME_INIT,
    isRefreshing: true,
    token: token
  }
}

export function homeData () {
  console.log('action  --->  HOME_DATA')
  return {
    type: HOME_DATA,
    isRefreshing: false,
    day_article: []
  }
}
