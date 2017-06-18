export const MY_FOLLOW_INIT = 'MY_FOLLOW_INIT'
export const MY_FOLLOW_INIT_SUCCESS = 'MY_FOLLOW_SUCCESS'
export const MY_FOLLOW_LOAD_MORE = 'MY_FOLLOW_LOAD_MORE'
export const MY_FOLLOW_MORE_SUCCESS = 'MY_FOLLOW_MORE_SUCCESS'
export const MY_FOLLOW_FOLLOW = 'MY_FOLLOW_FOLLOW'
export const MY_FOLLOW_FOLLOW_SUCCESS = 'MY_FOLLOW_FOLLOW_SUCCESS'

export function myFollowInit(payload) {
  console.log('action ---> MY_FOLLOW_INIT')
  return {
    type: MY_FOLLOW_INIT,
    payload
  }
}

export function myFollowInitSuccess (payload) {
  return {
    type: MY_FOLLOW_INIT_SUCCESS,
    payload
  }
}

export function myFollowLoadMore(payload) {
  console.log('action ---> My follow load more')
  return {
    type: MY_FOLLOW_LOAD_MORE,
    payload
  }
}

export function myFollowMoreSuccess(payload) {
  return {
    type: MY_FOLLOW_MORE_SUCCESS,
    payload
  }
}

export function myFollowFollow(id, position, myFocus, _type) {
  console.log('action ---> MY_FOLLOW_FOLLOW')
  return {
    type: MY_FOLLOW_FOLLOW,
    payload: {
      id, position, myFocus, type: _type
    }
  }
}

export function myFollowFollowSuccess (payload) {
  console.warn('lovedFollowedSuccess => action' + payload.position)
  return {
    type: MY_FOLLOW_FOLLOW_SUCCESS,
    payload
  }
}
