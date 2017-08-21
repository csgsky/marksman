import * as types from '../actions/recentDiaryAction'

const initState = {
  isRefreshing: false,
  diarys: [],
  page: 0,
  hasMoreData: true,
  isLoadingMore: false,
  isLiking: false
}


export default function getArticles (state = initState, action = {}) {
  switch (action.type) {
    case types.RECENTDIARY_INIT:
      return {
        ...state,
        isRefreshing: false,
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
    case types.RECENTDIARY_LIKE:
      return {
        ...state,
        isLiking: true
      }
    case types.RECENTDIARY_LIKE_SUCCESS:
      return {
        ...state,
        isLiking: false,
        diarys: likeSuccess(state.diarys, action.payload.index)
      }
    case types.RECENTDIARY_UPDATE_LIKE_COUNT:
      return {
        ...state,
        diarys: updateDiaryLike(state.diarys, action.diaryId)
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
    newData[index].my_like = 0
  }
  return newData
}

function updateDiaryLike(diarys, diaryId) {
  const newData = diarys.slice(0)
  for (let i = 0; i < newData.length; i++) {
    if (newData[i].diary_id === diaryId) {
      newData[i].my_like = 1
      newData[i].like.num += 1
      break;
    }
  }
  return newData
}
