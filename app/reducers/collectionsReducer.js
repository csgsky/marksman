import * as types from '../actions/collectionsAction'

const initState = {
  isRefreshing: false,
  collections: [],
  page: 0,
  hasMoreData: true,
  isLoadingMore: false
}


export default function recentDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.COLLECTIONS_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.COLLECTIONS_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        collections: action.collections,
        hasMoreData: action.hasMoreData,
        page: state.page + 1
      }
    case types.COLLECTIONS_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.COLLECTIONS_LOADING_MORE_DATA:
      return {
        ...state,
        collections: state.collections.concat(action.collections),
        isLoadingMore: false,
        hasMoreData: action.hasMoreData,
        page: state.page + 1
      }
    default:
      return state
  }
}
