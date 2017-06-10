export const TRASH_INIT = 'TRASH_INIT'
export const TRASH_DATA = 'TRASH_DATA'

export function trashInit () {
  return {
    type: TRASH_INIT,
    isRefreshing: true
  }
}

export function trashData (data) {
  console.log('action  --->  TRASH_DATA')
  console.log('action  --->  TRASH_DATA diary length ' + data.diarys.length)
  return {
    type: TRASH_DATA,
    isRefreshing: false,
    diarys: data.diarys
  }
}
