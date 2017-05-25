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
        console.warn(' Tab ===> 拿到')
        return 'Tab'
      } else {
        console.warn(' LabelPage ===> 拿到')
        return 'LabelPage'
      }
    }
  )
}
