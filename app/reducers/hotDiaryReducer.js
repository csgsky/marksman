import * as types from '../actions/hotDiaryAction'

const initState = {
  isRefreshing: false,
  diarys: [],
  page: 0,
  hasMoreData: true,
  isLoadingMore: false
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
    case types.HOTDIARY_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.HOTDIARY_LOADING_MORE_DATA:
      return {
        ...state,
        diarys: state.diarys.concat(action.diarys),
        isLoadingMore: false,
        hasMoreData: action.hasMoreData,
        page: state.page + 1
      }
    default:
      return state
  }
}
