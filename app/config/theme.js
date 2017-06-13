'use strict'
import { Dimensions, Platform } from 'react-native'

const globalTextColor = '#4a4a4a'
const globalSubTextColor = '#9b9b9b'
const toolbarTitleColor = '#6a6a6a'
module.exports = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  themeColor: '#FF5000',
  pageBackgroundColor: '#f4f4f4',
  grayColor: '#c4c4c4',
  btnActiveOpacity: 0.7,
  actionBar: {
    height: 56,
    backgroundColor: (Platform.OS === 'ios') ? '#f8f8f8' : '#25282b',
    fontSize: 18,
    fontColor: '#313131'
  },
  text: {
    globalTextColor: globalTextColor,
    globalSubTextColor: globalSubTextColor,
    toolbarTitleColor: toolbarTitleColor,
    fontSize: 16
  },
  scrollView: {
    fontSize: 16,
    underlineStyle: {
      backgroundColor: 'white'
    }
  }
}
