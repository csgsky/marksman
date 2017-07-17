import * as types from '../actions/message'

const initState = {
  sysmsgs: [],
  isLoadingMore: false,
  hasMoreData: false,
  page: 0,
  modes: [],
  notifications: [],
  commemts: []
}


export default function message (state = initState, action = {}) {
  switch (action.type) {
    case types.MESSAGE_SYSTEM_NOTIFY_INIT:
      return {
        ...state,
        hasMoreData: false,
        isLoadingMore: false,
        page: 0
      }
    case types.MESSAGE_SYSTEM_NOTIFY_DATA:
      return {
        ...state,
        sysmsgs: action.payload,
        hasMoreData: action.payload.length >= 10,
        page: state.page + 1
      }
    case types.MESSAGE_SYSTEM_NOTIFY_MORE:
      console.log('reducer --> MESSAGE_SYSTEM_NOTIFY_MORE', action.payload)
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MESSAGE_SYSTEM_NOTIFY_MORE_DATA:
      console.log('reducer --> MESSAGE_SYSTEM_NOTIFY_MORE_DATA', action.payload)
      return {
        ...state,
        sysmsgs: state.sysmsgs.concat(action.payload),
        isLoadingMore: false,
        page: state.page + 1,
        hasMoreData: action.payload.length >= 10
      }
    case types.MINE_MESSAGE_MODE_DATA:
      console.log('reducer --> MINE_MESSAGE_MODE_DATA', action.payload)
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
        page: 0
      }
    case types.MINE_MESSAGE_NOTIF_DATA:
      console.log('reducer --> MINE_MESSAGE_NOTIF_DATA', action.payload)
      return {
        ...state,
        notifications: action.payload,
        hasMoreData: action.payload.length >= 10,
        isLoadingMore: false,
        page: state.page + 1
      }
    case types.MINE_MESSAGE_NOTIF_MORE:
      return {
        ...state,
        isLoadingMore: true
      }
    case types.MINE_MESSAGE_NOTIF_MORE_DATA:
      console.log('reducer --> MINE_MESSAGE_NOTIF_MORE_DATA', action.payload)
      console.log('reducer --> MINE_MESSAGE_NOTIF_MORE_DATA', state.notifications.concat(action.payload))
      return {
        ...state,
        page: state.page + 1,
        hasMoreData: action.payload.length >= 10,
        isLoadingMore: false,
        notifications: state.notifications.concat(action.payload)
      }
    case types.MINE_MESSAGE_COMMENT_INIT:
      console.log('reducer --> MINE_MESSAGE_COMMENT_INIT', action.payload)
      return {
        ...state,
        isLoadingMore: false,
        hasMoreData: false,
        page: 0
      }
    case types.MINE_MESSAGE_COMMENT_DATA:
      console.log('reducer --> MINE_MESSAGE_COMMENT_DATA', action.payload)
      return {
        ...state,
        commemts: action.payload,
        hasMoreData: action.payload.length >= 10,
        page: state.page + 1
      }
    case types.MINE_MESSAGE_COMMENT_MORE_DATA:
      console.log('reducer --> MINE_MESSAGE_COMMENT_MORE_DATA', action.payload)
      return {
        ...state,
        commemts: state.commemts.concat(action.payload),
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
