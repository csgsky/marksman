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

export function profileMessageReminder () {
  console.log('action --> MESSAGE_PROFILECENER_REMINDER')
  return {
    type: MESSAGE_PROFILECENER_REMINDER,
  }
}

export function profileMessageReminderData(message) {
  console.log('action --> MESSAGE_PROFILECENER_REMINDER_DATA', message)
  return {
    type: MESSAGE_PROFILECENER_REMINDER_DATA,
    message
  }
}

export function personalInfoInit (userId) {
  console.log('action ==> PERSONAL_INFO_INIT ', userId)
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

export function submitUserInfo (payload, newInfo) {
  console.warn('action submit user info ===> ', payload)
  return {
    type: PERSONAL_SUBMIT_USERINFO,
    payload,
    newInfo
  }
}

export function submitUserInfoSuccess (newInfo) {
  console.warn('action submit user info success ===> ')
  return {
    type: PERSONAL_SUBMIT_USERINFO_SUCCESS,
    newInfo
  }
}

export function submitUserInfoError() {
  console.warn('action submit user info success ===> ')
  return {
    type: PERSONAL_SUBMIT_USERINFO_ERROR
  }
}

export function submitInitPage() {
  console.warn('action submit init info ')
  return {
    type: PERSONAL_INFO_SUBMIT_INIT
  }
}

