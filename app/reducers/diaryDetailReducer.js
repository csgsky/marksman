import * as types from '../actions/diaryDetailAction'

const initState = {
  isRefreshing: true
}

export default function diaryDetail (state = initState, action = {}) {
  switch (action.type) {
    case types.DIARY_DETAIL_INIT:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return {
        ...state,
        isRefreshing: false
      }
    default:
      return state
  }
}
