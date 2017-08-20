export const PERSONAL_INFO_INIT = 'PERSONAL_INFO_INIT'
export const PERSONAL_INFO_DATA = 'PERSONAL_INFO_DATA'
export const PERSONAL_INFO_ERROR = 'PERSONAL_INFO_ERROR'
export const PERSONAL_UNLOGIN_INFO_INIT = 'PERSONAL_UNLOGIN_INFO_INIT'
export const PERSONAL_SUBMIT_USERINFO = 'PERSONAL_SUBMIT_USERINFO'
export const PERSONAL_SUBMIT_USERINFO_SUCCESS = 'PERSONAL_SUBMIT_USERINFO_SUCCESS'
export const PERSONAL_SUBMIT_USERINFO_ERROR = 'PERSONAL_SUBMIT_USERINFO_ERROR'
export const PERSONAL_INFO_SUBMIT_INIT = 'PERSONAL_INFO_SUBMIT_INIT'
export const MESSAGE_PROFILECENER_REMINDER = 'MESSAGE_PROFILECENER_REMINDER'
export const MESSAGE_PROFILECENER_REMINDER_DATA = 'MESSAGE_PROFILECENER_REMINDER_DATA'
export const MESSAGE_PROFILE_ITEM_CLICK = 'MESSAGE_PROFILE_ITEM_CLICK'
// 个人中心小红点的消失
export const MINE_DISMISS_MINE_RED = 'MINE_DISMISS_MINE_RED'
export function profileMessageReminder () {
  return {
    type: MESSAGE_PROFILECENER_REMINDER,
  }
}

export function profileMessageReminderData(message) {
  return {
    type: MESSAGE_PROFILECENER_REMINDER_DATA,
    message
  }
}

export function personalInfoInit (userId) {
  return {
    type: PERSONAL_INFO_INIT,
    userId
  }
}

export function personalInfoData (info) {
  return {
    type: PERSONAL_INFO_DATA,
    info
  }
}

export function personalInfoError (errorMsg) {
  return {
    type: PERSONAL_INFO_ERROR,
    errorMsg
  }
}

export function unLoginInfoInit () {
  return {
    type: PERSONAL_UNLOGIN_INFO_INIT
  }
}

export function submitUserInfo (payload, newInfo, avtar) {
  console.warn('action submit user info ===> ', payload)
  return {
    type: PERSONAL_SUBMIT_USERINFO,
    payload,
    newInfo,
    avtar
  }
}

export function submitUserInfoSuccess (newInfo, avtar) {
  return {
    type: PERSONAL_SUBMIT_USERINFO_SUCCESS,
    newInfo,
    avtar
  }
}

export function submitUserInfoError() {
  return {
    type: PERSONAL_SUBMIT_USERINFO_ERROR
  }
}

export function submitInitPage() {
  return {
    type: PERSONAL_INFO_SUBMIT_INIT
  }
}

export function profileItemClick(value) {
  return {
    type: MESSAGE_PROFILE_ITEM_CLICK,
    value
  }
}

export function dismissPersonalCenterMineMsg () {
  return {
    type: MINE_DISMISS_MINE_RED
  }
}

