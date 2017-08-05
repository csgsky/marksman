import * as types from '../actions/searchAction'

const initState = {
  isRefreshing: false,
  searchText: '',
  diarys: [],
  searchInputClearShow: false,
  empty: false,
  page: 0,
  hasMoreData: true,
  isLoadingMore: false
}

export default function search (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_PAGE_INIT:
      return {
        ...state
      }
    case types.SEARCH_PAGE_BACK:
      return {
        ...initState
      }
    case types.SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchText: action.searchText,
        searchInputClearShow: action.searchText.length > 0
      }
    case types.SEARCH_PAGE_CLEAR_INPUT:
      return {
        ...state,
        searchText: '',
        searchInputClearShow: false,
      }
    case types.SEARCH_PAGE_SEARCH_INIT:
      return {
        ...state,
        isRefreshing: true
      }
    case types.SEARCH_PAGE_SEARCH_DATA:
      return {
        ...state,
        isRefreshing: false,
        empty: false,
        hasMoreData: action.diarys.length >= 10,
        diarys: action.diarys
      }
    case types.SEARCH_RESULT_EMPTY:
      return {
        ...state,
        isRefreshing: false,
        empty: true
      }
    case types.SEARCH_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.SEARCH_LOADING_MORE_DATA:
      return {
        ...state,
        isLoadingMore: false,
        empty: false,
        diarys: state.diarys.concat(action.diarys),
        hasMoreData: action.diarys.length >= 10,
        page: state.page + 1
      }
    default:
      return state
  }
}

