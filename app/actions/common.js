import Toast from 'react-native-root-toast'

export const SHOW_ERROR = 'SHOW_ERROR';

export function showError(payload) {
  Toast.show(payload, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
  return {
    type: SHOW_ERROR,
    payload
  }
}
