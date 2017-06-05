import * as types from '../actions/collectionsAction'

const initState = {
  isRefreshing: false,
  collections: []
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
        collections: action.collections
      }
    default:
      return state
  }
}
