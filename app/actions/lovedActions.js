export const LOVED_INIT = 'LOVED_INIT'
export const LOVED_DATA = 'LOVED_DATA'
export const LOVED_MORE = 'LOVED_MORE'
export const LOVED_MORE_DATA = 'LOVED_MORE_DATA'
export function LovedListInit (page) {
  return {
    type: LOVED_INIT,
    isRefreshing: true,
    page: page
  }
}

export function LovedListData (data) {
  return {
    type: LOVED_DATA,
    isRefreshing: false,
    loved: data,
    hasMore: data.length >= 8
  }
}

export function LovedListMore (page) {
  return {
    type: LOVED_MORE,
    isLoadingMore: true,
    page: page
  }
}

export function LovedListMoreData (data) {
  return {
    type: LOVED_MORE_DATA,
    isLoadingMore: false,
    loved: data,
    hasMore: data.length >= 8
  }
}
