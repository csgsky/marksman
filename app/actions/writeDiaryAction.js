export const WRITE_DIARY_INIT = 'WRITE_DIARY_INIT'

export function pageInit (paylaod) {
  return {
    type: WRITE_DIARY_INIT,
    paylaod
  }
}
