import * as types from '../actions/diaryAction'

const initState = {
  isRefreshing: true,
  comments: [],
  isLoadingMore: false,
  page: 0,
  hasMore: true,
  likeSuccess: false
}

export default function diaryDetail (state = initState, action = {}) {
  switch (action.type) {
    case types.DIARY_DETAIL_INIT:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return {
        ...state,
        isRefreshing: true
      }
    case types.DIARY_COMMENT_DATA:
      console.warn('reducer  --->  DIARY_DETAIL_INIT')
      return {
        ...state,
        isRefreshing: false,
        comments: action.comments
      }
    case types.DIARY_LIKE_SUCCESS:
      console.log('reducer ---> DIARY_LIKE_SUCCESS')
      return {
        ...state,
        likeSuccess: true
      }
    case types.DIARY_COMMENT_LIKE_SUCCESS:
      console.log('reducer ---> DIARY_COMMENT_LIKE_SUCCESS')
      return {
        ...state,
        comments: likeSuccess(state.comments, action.payload.index)
      }
    case types.CLEAR_DIARY:
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
    console.warn('hahahahhahah ' + newData[index].my_like)
    newData[index].my_like = 0
  }
  return newData
}
