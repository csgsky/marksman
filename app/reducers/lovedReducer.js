import * as types from '../actions/lovedActions'

const initState = {
  isRefreshing: false,
  loved: [],
  isLoadingMore: false,
  page: 0
}


export default function lovedList (state = initState, action = {}) {
  switch (action.type) {
    case types.LOVED_INIT:
      return {
        ...state,
        isRefreshing: false,
        page: action.page
      }
    case types.LOVED_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        loved: action.loved,
        hasMore: action.hasMore
      }
    case types.LOVED_MORE:
      return {
        ...state,
        isLoadingMore: action.isLoadingMore
      }
    case types.LOVED_MORE_DATA:
      return {
        ...state,
        isLoadingMore: action.isLoadingMore,
        loved: state.loved.concat(action.loved),
        hasMore: action.hasMore,
        page: state.page + 1
      }
    case types.LOVED_FOLLOWED_SUCCESS:
      return {
        ...state,
        loved: updateFocus(state.loved, action.position)
      }
    case types.LOVED_UNFOLLOWED_SUCCESS:
      return {
        ...state,
        loved: updateFocus(state.loved, action.position)
      }
    default:
      return state
  }
}

function updateFocus (loved, position) {
  const newLoved = loved.slice(0)
  if (newLoved[position].my_focus === 0) {
    newLoved[position].my_focus = 1
  } else if (newLoved[position].my_focus === 1) {
    newLoved[position].my_focus = 0
  }
  return newLoved
}
