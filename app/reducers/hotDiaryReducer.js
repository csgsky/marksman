import * as types from '../actions/hotDiaryAction'

const initState = {
  isRefreshing: false,
  diarys: []
}


export default function hotDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.HOTDIARY_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.HOTDIARY_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        diarys: action.diarys
      }
    default:
      return state
  }
}
