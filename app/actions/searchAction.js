

export const SEARCH_PAGE_INIT = 'SEARCH_PAGE_INIT'
export const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE'
export const SEARCH_PAGE_BACK = 'SEARCH_PAGE_BACK'
export const SEARCH_PAGE_CLEAR_INPUT = 'SEARCH_PAGE_CLEAR_INPUT'
export const SEARCH_PAGE_SEARCH_INIT = 'SEARCH_PAGE_SEARCH_INIT'
export const SEARCH_PAGE_SEARCH_DATA = 'SEARCH_PAGE_SEARCH_DATA'
export const SEARCH_RESULT_EMPTY = 'SEARCH_RESULT_EMPTY'
export const SEARCH_LOADING_MORE = 'SEARCH_LOADING_MORE'
export const SEARCH_LOADING_MORE_DATA = 'SEARCH_LOADING_MORE_DATA'

export function searchPageInit () {
  return {
    type: SEARCH_PAGE_INIT
  }
}

export function searchPageBack () {
  return {
    type: SEARCH_PAGE_BACK
  }
}

export function searchTextChange (text) {
  return {
    type: SEARCH_INPUT_CHANGE,
    searchText: text
  }
}

export function clearInput () {
  return {
    type: SEARCH_PAGE_CLEAR_INPUT
  }
}

export function searchDiary (kw) {
  return {
    type: SEARCH_PAGE_SEARCH_INIT,
    kw
  }
}

export function searchEmpty () {
  console.log('searchEmpty ====> ')
  return {
    type: SEARCH_RESULT_EMPTY
  }
}

export function searchDiaryData (diarys) {
  console.warn('searchDiaryData ===> ' + diarys.length)
  return {
    type: SEARCH_PAGE_SEARCH_DATA,
    diarys
  }
}

export function searchLoadingMore (page, kw) {
  return {
    type: SEARCH_LOADING_MORE,
    page,
    kw
  }
}

export function searchLoadingMoreData (diarys) {
  return {
    type: SEARCH_LOADING_MORE_DATA,
    diarys
  }
}
