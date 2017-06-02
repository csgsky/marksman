import {AsyncStorage} from 'react-native'
export function saveFirstInFlag (key, value) {
  AsyncStorage.setItem(key, value).then(
    () => {
      console.warn(key + ' ===> 保存成功')
    }
  )
}


export function getFirstInFlag (key) {
  AsyncStorage.getItem(key).then(
    (result) => {
      if (result !== null) {
        return 'Tab'
      } else {
        return 'LabelPage'
      }
    }
  )
}

export function setAuthorization (key, value) {
  AsyncStorage.setItem(key, value).then(
    () => {
    }
  )
}

// key = authorization

export const getAuthorization = async (key) => {
  var CryptoJS = require('crypto-js')
  var authorization = ''
  await AsyncStorage.getItem(key).then(value => {
    console.log(' authorization ===> value: ' + value)
    if (value !== null && value !== '') {
      console.log(' authorization ===> 拿到')
      authorization = value
    } else {
      console.log(' authorization ===> 没拿到')
      var rawStr = '/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/54'
      var words = encodeURIComponent(rawStr)
      var base64 = btoa(words)
      var hmacSHA1 = CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
      console.log('getAuthorization: ' + hmacSHA1)
      authorization = hmacSHA1
    }
  })
  return key
}
