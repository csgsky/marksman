import * as types from '../actions/myFollowUsersAction'

const initState = {
  isRefreshing: false,
  users: [],
  isEmpty: 0,
  isLoadingMore: false,
  page: 0,
  hasMore: true
}

export default function myFollowUsers (state = initState, action = {}) {
  switch (action.type) {
    case types.MY_FOLLOW_USERS_INIT:
      return {
        ...state,
        isRefreshing: true
      }
    case types.MY_FOLLOW_USERS_INIT_SUCCESS:
      console.log('reducer ---> MY_FOLLOW_USERS_INIT_SUCCESS')
      console.log(action.payload)
      return {
        ...state,
        isRefreshing: false,
        users: action.payload.users,
        isEmpty: action.payload.isEmpty
      }
    case types.MY_FOLLOW_USERS_LOAD_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MY_FOLLOW_USERS_MORE_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        users: state.users.concat(action.payload.users || []),
        hasMore: action.payload.users.length >= 5,
        page: state.page + 1
      }
    case types.MY_FOLLOW_USERS_FOLLOW_SUCCESS:
      console.warn('reducer MY_FOLLOW_FOLLOW_SUCCESS ==> action.position ' + action.payload.position)
      return {
        ...state,
        users: updateFollow(state.users, action.payload.position),
      }
    default:
      return state
  }
}

function updateFollow (data, position) {
  if (!data || !data.length) {
    return data
  }
  const newData = data.slice(0)
  newData[position].my_focus = !newData[position].my_focus
  return newData
}
