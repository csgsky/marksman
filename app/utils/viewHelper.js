import {Alert} from 'react-native'

export const stringTrim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

