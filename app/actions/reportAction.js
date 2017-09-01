import Toast from 'react-native-root-toast'

export const REPORT_IMPROPER_CONTENT = 'REPORT_IMPROPER_CONTENT'
export const REPORT_IMPROPER_CONTENT_SUCCESS = 'REPORT_IMPROPER_CONTENT_SUCCESS'
export const REPORT_IMPROPER_CONTENT_ERROR = 'REPORT_IMPROPER_CONTENT_ERROR'

export function reportInit (payload) {
  // alert(index)
  return {
    type: REPORT_IMPROPER_CONTENT,
    payload
  }
}

export function reportSuccess (it) {
  Toast.show('感谢您的举报，我们会尽快处理！', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: REPORT_IMPROPER_CONTENT_SUCCESS
  }
}

export function reportError () {
  Toast.show('感谢您的举报，我们会尽快处理！', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: REPORT_IMPROPER_CONTENT_ERROR
  }
}

