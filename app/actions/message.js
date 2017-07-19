export const MESSAGE_SYSTEM_NOTIFY_INIT = 'MESSAGE_SYSTEM_NOTIFY_INIT'
export const MESSAGE_SYSTEM_NOTIFY_DATA = 'MESSAGE_SYSTEM_NOTIFY_DATA'
export const MESSAGE_SYSTEM_NOTIFY_MORE = 'MESSAGE_SYSTEM_NOTIFY_MORE'
export const MESSAGE_SYSTEM_NOTIFY_MORE_DATA = 'MESSAGE_SYSTEM_NOTIFY_MORE_DATA'
export const MINE_MESSAGE_MODE_INIT = 'MINE_MESSAGE_MODE_INIT'
export const MINE_MESSAGE_MODE_DATA = 'MINE_MESSAGE_MODE_DATA'
export const MESSAGE_DISMISS_REMINDER = 'MESSAGE_DISMISS_REMINDER'
export const MINE_MESSAGE_NOTIF_INIT = 'MINE_MESSAGE_NOTIF_INIT'
export const MINE_MESSAGE_NOTIF_DATA = 'MINE_MESSAGE_NOTIF_DATA'
export const MINE_MESSAGE_NOTIF_MORE = 'MINE_MESSAGE_NOTIF_MORE'
export const MINE_MESSAGE_NOTIF_MORE_DATA = 'MINE_MESSAGE_NOTIF_MORE_DATA'
export const MINE_MESSAGE_COMMENT_INIT = 'MINE_MESSAGE_COMMENT_INIT'
export const MINE_MESSAGE_COMMENT_DATA = 'MINE_MESSAGE_COMMENT_DATA'
export const MINE_MESSAGE_COMMENT_MORE = 'MINE_MESSAGE_COMMENT_MORE'
export const MINE_MESSAGE_COMMENT_MORE_DATA = 'MINE_MESSAGE_COMMENT_MORE_DATA'

export const MINE_MESSAGE_USER_INIT = 'MINE_MESSAGE_USER_INIT'
export const MINE_MESSAGE_USER_DATA = 'MINE_MESSAGE_USER_DATA'
export const MINE_MESSAGE_USER_MORE = 'MINE_MESSAGE_USER_MORE'
export const MINE_MESSAGE_USER_MORE_DATA = 'MINE_MESSAGE_USER_MORE_DATA'

export function profileMessageReminder (payload) {
  console.log('action --> MESSAGE_SYSTEM_NOTIFY_INIT')
  return {
    type: MESSAGE_SYSTEM_NOTIFY_INIT,
    payload
  }
}

export function profileMessageReminderData(payload) {
  console.log('action --> MESSAGE_SYSTEM_NOTIFY_DATA', payload)
  return {
    type: MESSAGE_SYSTEM_NOTIFY_DATA,
    payload
  }
}

export function profileMessageReminderMore(payload) {
  console.log('action --> MESSAGE_SYSTEM_NOTIFY_MORE', payload)
  return {
    type: MESSAGE_SYSTEM_NOTIFY_MORE,
    payload
  }
}

export function profileMessageReminderMoreData(payload) {
  console.log('action --> MESSAGE_SYSTEM_NOTIFY_MORE_DATA', payload)
  return {
    type: MESSAGE_SYSTEM_NOTIFY_MORE_DATA,
    payload
  }
}

export function mineMessageModeInit() {
  console.log('action --> MINE_MESSAGE_MODE_INIT')
  return {
    type: MINE_MESSAGE_MODE_INIT
  }
}

export function mineMessageModeData (payload) {
  console.log('action --> MINE_MESSAGE_MODE_data', payload)
  return {
    type: MINE_MESSAGE_MODE_DATA,
    payload
  }
}

export function dismissReminder (position) {
  console.log('action ----> MESSAGE_DISMISS_MESSAGE')
  return {
    type: MESSAGE_DISMISS_REMINDER,
    position
  }
}

export function mineMessageNotifInit(payload) {
  console.log('action ---> MINE_MESSAGE_NOTIF_INIT', payload)
  return {
    type: MINE_MESSAGE_NOTIF_INIT,
    payload
  }
}

export function mineMessageNotifData (payload) {
  console.log('action ---> MINE_MESSAGE_NOTIF_DATA', payload)
  return {
    type: MINE_MESSAGE_NOTIF_DATA,
    payload
  }
}

export function mineMessageNotifMore(payload) {
  console.log('action ---> MINE_MESSAGE_NOTIF_MORE', payload)
  return {
    type: MINE_MESSAGE_NOTIF_MORE,
    payload
  }
}

export function mineMessageNotifMoreData (payload) {
  console.log('action ---> MINE_MESSAGE_NOTIF_MORE_DATA', payload)
  return {
    type: MINE_MESSAGE_NOTIF_MORE_DATA,
    payload
  }
}

export function mineMessageCommentInit (payload) {
  console.log('action ---> MINE_MESSAGE_COMMENT_INIT', payload)
  return {
    type: MINE_MESSAGE_COMMENT_INIT,
    payload
  }
}


export function mineMessageCommentData (payload) {
  console.log('action ---> MINE_MESSAGE_COMMENT_DATA', payload)
  return {
    type: MINE_MESSAGE_COMMENT_DATA,
    payload
  }
}

export function mineMessageCommentMore (payload) {
  console.log('action ---> MINE_MESSAGE_COMMENT_MORE', payload)
  return {
    type: MINE_MESSAGE_COMMENT_MORE,
    payload
  }
}

export function mineMessageCommentMoreData (payload) {
  console.log('action ---> MINE_MESSAGE_COMMENT_MORE_DATA', payload)
  return {
    type: MINE_MESSAGE_COMMENT_MORE_DATA,
    payload
  }
}

export function mineMessageUserInit (payload) {
  console.log('action ---> MINE_MESSAGE_USER_INIT', payload)
  return {
    type: MINE_MESSAGE_USER_INIT,
    payload
  }
}
export function mineMessageUserData (payload) {
  console.log('action ---> MINE_MESSAGE_USER_DATA', payload)
  return {
    type: MINE_MESSAGE_USER_DATA,
    payload
  }
}
export function mineMessageUserMore (payload) {
  console.log('action ---> MINE_MESSAGE_USER_MORE', payload)
  return {
    type: MINE_MESSAGE_USER_MORE,
    payload
  }
}
export function mineMessageUserMoreData (payload) {
  console.log('action ---> MINE_MESSAGE_USER_MORE_DATA', payload)
  return {
    type: MINE_MESSAGE_USER_MORE_DATA,
    payload
  }
}

