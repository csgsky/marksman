export const COLLECTIONS_INIT = 'COLLECTIONS_INIT'
export const COLLECTIONS_DATA = 'COLLECTIONS_DATA'


export function collectionsInit (token) {
  console.log('action  --->  COLLECTIONS_INIT')
  console.log('action  --->  COLLECTIONS_TOKEN:' + token)
  return {
    type: COLLECTIONS_INIT,
    isRefreshing: true,
    token: token
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
