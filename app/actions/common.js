import Toast from 'react-native-root-toast'

export const SHOW_ERROR = 'SHOW_ERROR';

export function showError(payload) {
  console.log('action ---> SHOW_ERROR')
  Toast.show(payload, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
    // calls on toast\`s appear animation start
    },
    onShown: () => {
    // calls on toast\`s appear animation end.
    },
    onHide: () => {
    // calls on toast\`s hide animation start.
    },
    onHidden: () => {
    // calls on toast\`s hide animation end.
    }
  })
  return {
    type: SHOW_ERROR,
    payload
  }
}
