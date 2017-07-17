export const SHOW_ERROR = 'SHOW_ERROR';

export function showError(payload) {
  console.log('action ---> SHOW_ERROR')
  return {
    type: SHOW_ERROR,
    payload
  }
}
