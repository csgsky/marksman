export const DISCOVERY_INIT = 'DISCOVERY_INIT'
export const DISCOVERY_DATA = 'DISCOVERY_DATA'
export const DISCOVERY_MORE = 'DISCOVERY_MORE'
export const DISCOVERY_MORE_DATA = 'DISCOVERY_MORE_DATA'
export const RECOMMEND_USER_FOLLOWED = 'RECOMMEND_USER_FOLLOWED'
export const RECOMMEND_USER_FOLLOWED_SUCCESS = 'RECOMMEND_USER_FOLLOWED_SUCCESS'
export const RECOMMEND_USER_UNFOLLOWED_SUCCESS = 'RECOMMEND_USER_UNFOLLOWED_SUCCESS'

export function discoveryInit () {
  return {
    type: DISCOVERY_INIT,
    isRefreshing: true
  }
}

export function discoveryData (talks, ranks, banners) {
  console.log('action  --->  DISCOVER_DATA')
  return {
    type: DISCOVERY_DATA,
    isRefreshing: false,
    talks,
    ranks,
    banners
  }
}

export function discoveryMore (page) {
  console.log('action  --->  DISCOVERY_MORE')
  return {
    type: DISCOVERY_MORE,
    page
  }
}

export function discoveryMoreData (payload) {
  console.log('action  --->  DISCOVERY_MORE_ data', payload)
  return {
    type: DISCOVERY_MORE_DATA,
    payload
  }
}

export function recommendUserFollowed (followedId, position, myFocus) {
  return {
    type: RECOMMEND_USER_FOLLOWED,
    followedId,
    position,
    myFocus
  }
}

export function recommendUserFollowSuccess (position) {
  return {
    type: RECOMMEND_USER_FOLLOWED_SUCCESS,
    position
  }
}

export function recommendUserUnFollowSuccess (position) {
  return {
    type: RECOMMEND_USER_UNFOLLOWED_SUCCESS,
    position
  }
}
