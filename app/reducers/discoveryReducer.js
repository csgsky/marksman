import * as types from '../actions/discoverAction'

const initState = {
  isRefreshing: false,
  talks: [],
  ranks: [],
  banners: []
}


export default function discover (state = initState, action = {}) {
  switch (action.type) {
    case types.DISCOVERY_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.DISCOVERY_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        talks: action.talks.slice(0, 5),
        ranks: action.ranks,
        banners: action.banners
      }
    default:
      return state
  }
}
