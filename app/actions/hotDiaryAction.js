export const HOTDIARY_INIT = 'HOTDIARY_INIT'
export const HOTDIARY_DATA = 'HOTDIARY_DATA'


export function recentDiaryInit (token) {
  console.log('action  --->  HOTDIARY_INIT')
  console.log('action  --->  HOTDIARY_TOKEN:' + token)
  return {
    type: HOTDIARY_INIT,
    isRefreshing: true,
    token: token
  }
}

export function recentDiaryData (data) {
  console.log('action  --->  HOTDIARY_DATA')
  console.log('action  --->  HOTDIARY_DATA diary length ' + data.diarys.length)
  return {
    type: HOTDIARY_DATA,
    isRefreshing: false,
    diarys: data.diarys
  }
}
