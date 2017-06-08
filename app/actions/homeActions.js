export const HOME_INIT = 'HOME_INIT'
export const HOME_DATA = 'HOME_DATA'


export function homeInit () {
  return {
    type: HOME_INIT,
    isRefreshing: true
  }
}

export function homeData (data) {
  console.log('action  --->  HOME_DATA')
  console.log('action  --->  HOME_DATA diary length ' + data.diarys.length)
  return {
    type: HOME_DATA,
    isRefreshing: false,
    diarys: data.diarys
  }
}
