import * as types from '../actions/homeActions'

const initState = {
  isRefreshing: false,
  diarys: []
}


export default function recentDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.HOME_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.HOME_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        diarys: action.diarys
      }
    default:
      return state
  }
}
