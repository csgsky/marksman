import * as types from '../actions/homeActions'

const initState = {
  isRefreshing: false,
  diarys: [],
  page: 0,
  hasMoreData: true,
  isLoadingMore: false,
  isLogin: true
}


export default function recentDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.HOME_VISITOR:
      return {
        ...state,
        isLogin: false,
        hasMoreData: false
      }
    case types.HOME_INIT:
      return {
        ...state,
        isLogin: true,
        isRefreshing: false,
        page: action.page
      }
    case types.HOME_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        diarys: action.diarys,
        page: state.page + 1,
        hasMoreData: action.hasMoreData,
      }
    case types.HOME_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.HOME_LOADING_MORE_DATA:
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
