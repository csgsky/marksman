'use strict'
import { Dimensions, Platform } from 'react-native'
import px2dp from '../utils/px2dp'

const globalTextColor = '#4a4a4a'
const globalSubTextColor = '#9b9b9b'
module.exports = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  themeColor: '#FF5000',
  pageBackgroundColor: '#f4f4f4',
  grayColor: '#c4c4c4',
  btnActiveOpacity: 0.7,
  actionBar: {
    height: (Platform.OS === 'android') ? px2dp(56) : px2dp(69),
    backgroundColor: (Platform.OS === 'ios') ? '#f8f8f8' : '#25282b',
    fontSize: (Platform.OS === 'ios') ? px2dp(18) : 18,
    fontColor: (Platform.OS === 'ios') ? '#313131' : 'white'
  },
  text: {
    globalTextColor: globalTextColor,
    globalSubTextColor: globalSubTextColor,
    fontSize: px2dp(15)
  },
  scrollView: {
    fontSize: px2dp(15),
    underlineStyle: {
      backgroundColor: 'white'
    }
  }
}
