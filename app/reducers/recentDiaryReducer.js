import * as types from '../actions/recentDiaryAction'

const initState = {
  isRefreshing: false,
  diarys: [],
  page: 0,
  hasMoreData: true,
  isLoadingMore: false
}


export default function getArticles (state = initState, action = {}) {
  switch (action.type) {
    case types.RECENTDIARY_INIT:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        page: action.page
      }
    case types.RECENTDIARY_DATA:
      return {
        ...state,
        isRefreshing: action.isRefreshing,
        diarys: action.diarys,
        page: state.page + 1,
        hasMoreData: action.hasMoreData
      }
    case types.RECENTDIARY_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.RECENTDIARY_LOADING_MORE_DATA:
      return {
        ...state,
        diarys: state.diarys.concat(action.diarys),
        isLoadingMore: false,
        hasMoreData: action.hasMoreData,
        page: state.page + 1
      }
    case types.RECENTDIARY_LIKE_SUCCESS:
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
