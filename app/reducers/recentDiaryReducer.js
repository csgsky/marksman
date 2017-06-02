import * as types from '../actions/recentDiaryAction'

const initState = {
  isRefreshing: false,
  diarys: []
}


export default function getArticles (state = initState, action = {}) {
  switch (action.type) {
    case types.RECENTDIARY_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.RECENTDIARY_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        diarys: action.diarys
      }
    default:
      return state
  }
}
