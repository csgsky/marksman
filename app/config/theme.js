import { Dimensions, Platform } from 'react-native'
import DefaultUserAvatar from '../img/test_icon.jpeg'
import PageBack from '../img/page_back.png'

const globalTextColor = '#4a4a4a'
const globalSubTextColor = '#9b9b9b'
const toolbarTitleColor = '#6a6a6a'
module.exports = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  themeColor: '#FF5000',
  pageBackgroundColor: '#f4f4f4',
  grayColor: '#c4c4c4',
  linkColor: '#6082a7',
  likedColor: '#d14428',
  btnActiveOpacity: 0.7,
  actionBar: {
    height: 56,
    backgroundColor: (Platform.OS === 'ios') ? '#f8f8f8' : '#25282b',
    fontSize: 18,
    fontColor: '#313131'
  },
  text: {
    globalTextColor,
    globalSubTextColor,
    toolbarTitleColor,
    xxlgFontSize: 16,
    xlgFontSize: 14,
    lgFontSize: 12,
    mdFontSize: 11,
    smFontSize: 10
  },
  border: {
    color: '#f8f8f8'
  },
  scrollView: {
    fontSize: 16,
    underlineStyle: {
      backgroundColor: 'white'
    }
  },
  imgs: {
    DefaultUserAvatar,
    PageBack
  }
}
