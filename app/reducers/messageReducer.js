import * as types from '../actions/message'

const initState = {
  sysmsgs: [],
  isLoadingMore: false,
  hasMoreData: false,
  page: 0,
  modes: [],
  notifications: [],
  commemts: [],
  isRefreshing: true,
  users: []
}


export default function message (state = initState, action = {}) {
  switch (action.type) {
    case types.MESSAGE_SYSTEM_NOTIFY_INIT:
      return {
        ...state,
        hasMoreData: false,
        isRefreshing: true,
        isLoadingMore: false,
        page: 0
      }
    case types.MESSAGE_SYSTEM_NOTIFY_DATA:
      return {
        ...state,
        sysmsgs: action.payload,
        hasMoreData: action.payload.length >= 10,
        isRefreshing: false,
        page: state.page + 1
      }
    case types.MESSAGE_SYSTEM_NOTIFY_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MESSAGE_SYSTEM_NOTIFY_MORE_DATA:
      return {
        ...state,
        sysmsgs: state.sysmsgs.concat(action.payload),
        isLoadingMore: false,
        page: state.page + 1,
        hasMoreData: action.payload.length >= 10
      }
    case types.MINE_MESSAGE_MODE_DATA:
      return {
        ...state,
        modes: action.payload
      }
    case types.MESSAGE_DISMISS_REMINDER:
      return {
        ...state,
        modes: dismissReminder(state.modes, action.position)
      }
    case types.MINE_MESSAGE_NOTIF_INIT:
      return {
        ...state,
        isLoadingMore: false,
        hasMoreData: false,
        isRefreshing: true,
        page: 0
      }
    case types.MINE_MESSAGE_NOTIF_DATA:
      return {
        ...state,
        notifications: action.payload,
        hasMoreData: action.payload.length >= 10,
        isLoadingMore: false,
        isRefreshing: false,
        page: state.page + 1
      }
    case types.MINE_MESSAGE_NOTIF_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MINE_MESSAGE_NOTIF_MORE_DATA:
      return {
        ...state,
        page: state.page + 1,
        hasMoreData: action.payload.length >= 10,
        isLoadingMore: false,
        notifications: state.notifications.concat(action.payload)
      }
    case types.MINE_MESSAGE_COMMENT_INIT:
      return {
        ...state,
        isLoadingMore: false,
        hasMoreData: false,
        isRefreshing: true,
        page: 0
      }
    case types.MINE_MESSAGE_COMMENT_DATA:
      return {
        ...state,
        commemts: action.payload,
        hasMoreData: action.payload.length >= 10,
        isRefreshing: false,
        page: state.page + 1
      }
    case types.MINE_MESSAGE_COMMENT_MORE_DATA:
      return {
        ...state,
        commemts: state.commemts.concat(action.payload),
        hasMoreData: action.payload.length >= 10,
        isLoadingMore: false,
        page: state.page + 1
      }
    case types.MINE_MESSAGE_USER_INIT:
      return {
        ...state,
        isLoadingMore: false,
        hasMoreData: false,
        isRefreshing: true,
        page: 0
      }
    case types.MINE_MESSAGE_USER_DATA:
      return {
        ...state,
        users: action.payload,
        hasMoreData: action.payload.length >= 10,
        isRefreshing: false,
        page: state.page + 1
      }
    case types.MINE_MESSAGE_USER_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MINE_MESSAGE_USER_MORE_DATA:
      return {
        ...state,
        users: state.users.concat(action.payload),
        hasMoreData: action.payload.length >= 10,
        isLoadingMore: false,
        page: state.page + 1
      }
    default:
      return state
  }
}

function dismissReminder (modes, position) {
  return modes.map((value, index) => {
    if (index === position && value.red_dot === 1) {
      return {...value, red_dot: 0}
    }
    return value
  })
}
