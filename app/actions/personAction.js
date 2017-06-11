export const PERSON_INIT = 'PERSON_INIT'
export const PERSON_DATA = 'PERSON_DATA'
export const PERSON_DIARY_MORE = 'PERSON_DIARY_MORE'
export const PERSON_DIARY_MORE_DATA = 'PERSON_DIARY_MORE_DATA'

export function personInit (id) {
  return {
    type: PERSON_INIT,
    isRefreshing: true,
    id
  }
}

export function personData (data) {
  console.log('action  --->  PERSON_DATA')
  return {
    type: PERSON_DATA,
    person: data,
    isRefreshing: false
  }
}

export function personDiaryMore (page) {
  console.log('action ---> PERSON_DIARY_LOAD_MORE')
  return {
    type: PERSON_DIARY_MORE,
    isLoadingMore: true,
    page: page
  }
}

export function personDiaryMoreData (data) {
  return {
    type: PERSON_DIARY_MORE_DATA,
    isLoadingMore: false,
    diaries: data,
    hasMore: data.length >= 3
  }
}
