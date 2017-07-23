import * as types from '../actions/discoverAction'

const initState = {
  isRefreshing: false,
  talks: [],
  ranks: [],
  banners: [],
  page: 0,
  hasMoreData: false,
  isLoadingMore: false
}


export default function discovery (state = initState, action = {}) {
  switch (action.type) {
    case types.DISCOVERY_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.DISCOVERY_DATA:
      console.log('reducer ==> DISCOVERY_DATA')
      console.log(action.talks.length >= 10)
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        talks: action.talks,
        ranks: action.ranks,
        banners: action.banners,
        hasMoreData: action.talks.length >= 10,
        page: state.page + 1
      }
    case types.RECOMMEND_USER_FOLLOWED_SUCCESS:
      return {
        ...state,
        ranks: updateFocus(state.ranks, action.position)
      }
    case types.DISCOVERY_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.DISCOVERY_MORE_DATA: {
      return {
        ...state,
        isLoadingMore: false,
        talks: state.talks.concat(action.payload),
        hasMoreData: action.payload.length >= 10,
        page: state.page + 1
      }
    }
    case types.RECOMMEND_USER_UNFOLLOWED_SUCCESS:
      return {
        ...state,
        ranks: updateFocus(state.ranks, action.position)
      }
    default:
      return state
  }
}

function updateFocus (loved, position) {
  console.log('update focus, position ', position)
  const newLoved = loved.slice(0)
  if (newLoved[position].my_focus === 0) {
    console.log('update focus, 关注 ')
    newLoved[position].my_focus = 1
  } else if (newLoved[position].my_focus === 1) {
    console.log('update focus, 取消关注 ')
    newLoved[position].my_focus = 0
  }
  console.log({newLoved})
  return newLoved
}
