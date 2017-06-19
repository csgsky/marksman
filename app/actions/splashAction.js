export const SPLASH_DEVICE_USER_INFO = 'SPLASH_DEVICE_USER_INFO'

export function getDeviceUserInfo (deviceid, token) {
  return {
    type: SPLASH_DEVICE_USER_INFO,
    deviceid,
    token
  }
}
