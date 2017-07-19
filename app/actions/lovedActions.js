export const LOVED_INIT = 'LOVED_INIT'
export const LOVED_DATA = 'LOVED_DATA'
export const LOVED_MORE = 'LOVED_MORE'
export const LOVED_MORE_DATA = 'LOVED_MORE_DATA'
export const LOVED_FOLLOWED = 'LOVED_FOLLOWED'
export const LOVED_FOLLOWED_SUCCESS = 'LOVED_FOLLOWED_SUCCESS'
export const LOVED_UNFOLLOWED_SUCCESS = 'LOVED_UNFOLLOWED_SUCCESS'
export function LovedListInit (page) {
  return {
    type: LOVED_INIT,
    isRefreshing: true,
    page
  }
}

export function LovedListData (data) {
  return {
    type: LOVED_DATA,
    isRefreshing: false,
    loved: data,
    hasMore: data.length >= 10
  }
}

export function LovedListMore (page) {
  return {
    type: LOVED_MORE,
    isLoadingMore: true,
    page
  }
}

export function LovedListMoreData (data) {
  return {
    type: LOVED_MORE_DATA,
    isLoadingMore: false,
    loved: data,
    hasMore: data.length >= 10
  }
}

export function LovedFollowed (followedId, position, myFocus) {
  return {
    type: LOVED_FOLLOWED,
    followedId,
    position,
    myFocus
  }
}

export function LovedFollowSuccess (position) {
  return {
    type: LOVED_FOLLOWED_SUCCESS,
    position
  }
}

export function LovedUnFollowSuccess (position) {
  return {
    type: LOVED_UNFOLLOWED_SUCCESS,
    position
  }
}
