import * as types from '../actions/homeActions'

const initState = {
  isRefreshing: false,
  day_article: []
}


export default function getArticles (state = initState, action = {}) {
  switch (action.type) {
    case types.HOME_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    default:
      return state
  }
}
