export const MY_FOLLOW_USERS_INIT = 'MY_FOLLOW_USERS_INIT'
export const MY_FOLLOW_USERS_INIT_SUCCESS = 'MY_FOLLOW_USERS_SUCCESS'
export const MY_FOLLOW_USERS_LOAD_MORE = 'MY_FOLLOW_USERS_LOAD_MORE'
export const MY_FOLLOW_USERS_MORE_SUCCESS = 'MY_FOLLOW_USERS_MORE_SUCCESS'
export const MY_FOLLOW_USERS_FOLLOW = 'MY_FOLLOW_USERS_FOLLOW'
export const MY_FOLLOW_USERS_FOLLOW_SUCCESS = 'MY_FOLLOW_USERS_FOLLOW_SUCCESS'

export function myFollowUsersInit(payload) {
  return {
    type: MY_FOLLOW_USERS_INIT,
    payload
  }
}

export function myFollowUsersInitSuccess (payload) {
  return {
    type: MY_FOLLOW_USERS_INIT_SUCCESS,
    payload
  }
}

export function myFollowUsersLoadMore(payload) {
  return {
    type: MY_FOLLOW_USERS_LOAD_MORE,
    payload
  }
}

export function myFollowUsersMoreSuccess(payload) {
  return {
    type: MY_FOLLOW_USERS_MORE_SUCCESS,
    payload
  }
}

export function myFollowUsersFollow(id, position, myFocus, _type) {
  return {
    type: MY_FOLLOW_USERS_FOLLOW,
    payload: {
      id, position, myFocus, type: _type
    }
  }
}

export function myFollowUsersFollowSuccess (payload) {
  return {
    type: MY_FOLLOW_USERS_FOLLOW_SUCCESS,
    payload
  }
}
