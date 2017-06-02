export const RECENTDIARY_INIT = 'RECENTDIARY_INIT'
export const RECENTDIARY_DATA = 'RECENTDIARY_DATA'


export function recentDiaryInit (token) {
  console.log('action  --->  RECENTDIARY_INIT')
  console.log('action  --->  RECENTDIARY_INIT_TOKEN:' + token)
  return {
    type: RECENTDIARY_INIT,
    isRefreshing: true,
    token: token
  }
}

export function recentDiaryData (data) {
  console.log('action  --->  RECENTDIARY_DATA')
  console.log('action  --->  RECENTDIARY_DATA diary length ' + data.diarys.length)
  return {
    type: RECENTDIARY_DATA,
    isRefreshing: false,
    diarys: data.diarys
  }
}
