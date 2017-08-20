import * as types from '../actions/personAction'

const initState = {
  isRefreshing: false,
  diaries: [],
  isLoadingMore: false,
  hasMore: true,
  page: 0,
  info: {},
  isLiking: false
}

export default function personalData (state = initState, action = {}) {
  switch (action.type) {
    case types.PERSON_INIT:
      return initState;
    case types.PERSON_DATA:
      return {
        ...state,
        isRefreshing: false,
        diaries: action.person.diaries,
        info: action.person.info,
        hasMore: action.person.diaries.length >= 10
      }
    case types.PERSON_DIARY_MORE:
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
    case types.PERSON_DIARY_LIKE:
      return {
        ...state,
        isLiking: true
      }
    case types.PERSON_DIARY_LIKE_SUCCESS:
      return {
        ...state,
        isLiking: false,
        diaries: likeSuccess(state.diaries, action.payload.index)
      }
    case types.CLEAR_PERSON_DATA:
      return initState
    default:
      return state
  }
}

function likeSuccess(data, index) {
  const newData = data.slice(0)
  if (newData[index].my_like === 0) {
    newData[index].my_like = 1
    newData[index].like.num += 1
  } else if (newData[index].my_like === 1) {
    newData[index].my_like = 0
  }
  return newData
}
