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
      console.log(action.person)
      return {
        ...state,
        isRefreshing: false,
        diaries: action.person.diaries,
        info: action.person.info
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
    case types.PERSON_DIARY_LIKE_SUCCESS:
      return {
        ...state,
        diarys: likeSuccess(state.diaries, action.payload.index)
      }
    case types.CLEAR_PERSON_DATA:
      return initState
    default:
      return state
  }
}

function likeSuccess(data, index) {
  console.log(data, index);
  const newData = [...data]
  if (newData[index].my_like === 0) {
    newData[index].my_like = 1
    newData[index].like.num += 1
  } else if (newData[index].my_like === 1) {
    console.warn('hahahahhahah ' + newData[index].my_like)
    newData[index].my_like = 0
  }
  console.log(newData === data)
  return newData
}
