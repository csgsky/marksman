export const PERSONAL_INFO_INIT = 'PERSONAL_INFO_INIT'
export const PERSONAL_INFO_DATA = 'PERSONAL_INFO_DATA'
export const PERSONAL_INFO_ERROR = 'PERSONAL_INFO_ERROR'
export const PERSONAL_UNLOGIN_INFO_INIT = 'PERSONAL_UNLOGIN_INFO_INIT'
export function personalInfoInit (userId) {
  console.warn('action ==> PERSONAL_INFO_INIT ', userId)
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

