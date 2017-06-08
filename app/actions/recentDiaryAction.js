export const RECENTDIARY_INIT = 'RECENTDIARY_INIT'
export const RECENTDIARY_DATA = 'RECENTDIARY_DATA'


export function recentDiaryInit () {
  return {
    type: RECENTDIARY_INIT,
    isRefreshing: true
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
