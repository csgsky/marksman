export const COLLECTIONS_INIT = 'COLLECTIONS_INIT'
export const COLLECTIONS_DATA = 'COLLECTIONS_DATA'


export function collectionsInit () {
  return {
    type: COLLECTIONS_INIT,
    isRefreshing: true
  }
}

export function collectionsData (data) {
  console.log('action  --->  COLLECTIONS_DATA')
  return {
    type: COLLECTIONS_DATA,
    isRefreshing: false,
    collections: data.collections
  }
}
