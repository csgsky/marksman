export const DISCOVERY_INIT = 'DISCOVERY_INIT'
export const DISCOVERY_DATA = 'DISCOVERY_DATA'


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
    talks: talks,
    ranks: ranks,
    banners: banners
  }
}
