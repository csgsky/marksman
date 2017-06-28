import * as types from '../actions/hotDiaryAction'

const initState = {
  isRefreshing: false,
  diarys: [],
  page: 0,
  hasMoreData: true,
  isLoadingMore: false
}


export default function hotDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.HOTDIARY_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing
      }
    case types.HOTDIARY_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        diarys: action.diarys
      }
    case types.HOTDIARY_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.HOTDIARY_LOADING_MORE_DATA:
      return {
        ...state,
        diarys: state.diarys.concat(action.diarys),
        isLoadingMore: false,
        hasMoreData: action.hasMoreData,
        page: state.page + 1
      }
    case types.HOTDIARY_LIKE_SUCCESS:
      return {
        ...state,
        diarys: likeSuccess(state.diarys, action.payload.index)
      }
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
    console.warn('hahahahhahah ' + newData[index].my_like)
    newData[index].my_like = 0
  }
  return newData
}
