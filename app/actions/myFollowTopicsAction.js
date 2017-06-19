export const MY_FOLLOW_TOPICS_INIT = 'MY_FOLLOW_TOPICS_INIT'
export const MY_FOLLOW_TOPICS_INIT_SUCCESS = 'MY_FOLLOW_TOPICS_SUCCESS'
export const MY_FOLLOW_TOPICS_LOAD_MORE = 'MY_FOLLOW_TOPICS_LOAD_MORE'
export const MY_FOLLOW_TOPICS_MORE_SUCCESS = 'MY_FOLLOW_TOPICS_MORE_SUCCESS'
export const MY_FOLLOW_TOPICS_FOLLOW = 'MY_FOLLOW_TOPICS_FOLLOW'
export const MY_FOLLOW_TOPICS_FOLLOW_SUCCESS = 'MY_FOLLOW_TOPICS_FOLLOW_SUCCESS'

export function myFollowTopicsInit(payload) {
  console.log('action ---> MY_FOLLOW_TOPICS_INIT')
  return {
    type: MY_FOLLOW_TOPICS_INIT,
    payload
  }
}

export function myFollowTopicsInitSuccess (payload) {
  return {
    type: MY_FOLLOW_TOPICS_INIT_SUCCESS,
    payload
  }
}

export function myFollowTopicsLoadMore(payload) {
  console.log('action ---> My follow users load more')
  return {
    type: MY_FOLLOW_TOPICS_LOAD_MORE,
    payload
  }
}

export function myFollowTopicsMoreSuccess(payload) {
  return {
    type: MY_FOLLOW_TOPICS_MORE_SUCCESS,
    payload
  }
}

export function myFollowTopicsFollow(id, position, myFocus, _type) {
  console.log('action ---> MY_FOLLOW_TOPICS_FOLLOW')
  return {
    type: MY_FOLLOW_TOPICS_FOLLOW,
    payload: {
      id, position, myFocus, type: _type
    }
  }
}

export function myFollowTopicsFollowSuccess (payload) {
  console.warn('myFollowTopicsFollowSuccess => action' + payload.position)
  return {
    type: MY_FOLLOW_TOPICS_FOLLOW_SUCCESS,
    payload
  }
}
