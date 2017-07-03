export const COLLECTIONS_INIT = 'COLLECTIONS_INIT'
export const COLLECTIONS_DATA = 'COLLECTIONS_DATA'
export const COLLECTIONS_LOADING_MORE = 'COLLECTIONS_LOADING_MORE'
export const COLLECTIONS_LOADING_MORE_DATA = 'COLLECTIONS_LOADING_MORE_DATA'
export function collectionsInit (page) {
  return {
    type: COLLECTIONS_INIT,
    isRefreshing: true,
    page
  }
}

export function collectionsData (data) {
  console.warn('action  --->  COLLECTIONS LENGTH ' + data.collections.length)
  console.warn('action  --->  COLLECTIONS_DATA ', data.collections.length >= 10)
  return {
    type: COLLECTIONS_DATA,
    isRefreshing: false,
    collections: data.collections,
    hasMoreData: data.collections.length >= 10
  }
}

export function collectionLoadingMore (page) {
  return {
    type: COLLECTIONS_LOADING_MORE,
    isLoadingMore: true,
    page
  }
}

export function collectionLoadingMoreData (data) {
  return {
    type: COLLECTIONS_LOADING_MORE_DATA,
    isLoadingMore: false,
    collections: data.collections,
    hasMoreData: data.collections.length >= 10
  }
}

