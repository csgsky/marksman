import * as types from '../actions/personAction'

const initState = {
  isRefreshing: false,
  diaries: [],
  isLoadingMore: false,
  hasMore: true,
  page: 0,
  info: {}
}

export default function personalData (state = initState, action = {}) {
  switch (action.type) {
    case types.PERSON_INIT:
      return {
        ...state,
        isRefreshing: false
      }
    case types.PERSON_DATA:
      return {
        ...state,
        isRefreshing: false,
        diaries: action.person.diaries,
        info: action.person.info
      }
    case types.personDiaryMore:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.PERSON_DIARY_MORE_DATA:
      return {
        ...state,
        isLoadingMore: false,
        diaries: state.diaries.concat(action.diaries),
        page: state.page + 1,
        hasMore: action.hasMore
      }
    case types.PERSON_FOLLOW_SUCCESS:
      return {
        ...state,
        info: {...state.info, my_focus: !state.info.my_focus}
      }
    default:
      return state
  }
}
