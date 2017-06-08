import * as types from '../actions/searchAction'

const initState = {
  isRefreshing: false,
  searchText: '',
  isLoadingMore: false,
  page: 0
}

export default function search (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_PAGE_INIT:
      return {
        ...state
      }
    default:
      return state
  }
}

