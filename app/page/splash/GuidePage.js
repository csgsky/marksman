import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage, NativeModules} from 'react-native'
import { NavigationActions } from 'react-navigation'
import Swiper from 'react-native-swiper'
import theme from '../../config/theme'
import pageOne from '../../img/boot_page_one@2x.jpg'
import pageOneWord from '../../img/boot_page_one_word.png'
import pageTwo from '../../img/boot_page_two@2x.jpg'
import pageTwoWord from '../../img/boot_page_two_word.png'
import pageThree from '../../img/boot_page_three@2x.jpg'
import pageThreeWord from '../../img/boot_page_three_word.png'
import * as consts from '../../utils/const'

const resetActionMain = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Tab'})
  ]
})
export default class Guide extends Component {

  componentDidMount () {
    NativeModules.TCAgent.trackSingle('引导页第一页展现')
  }

  onScrollEnd = (e, state) => {
    let page = ''
    if (state.index === 0) {
      page = '引导页第一页展现'
    } else if (state.index === 1) {
      page = '进入引导页第二页'
    } else if (state.index === 2) {
      page = '进入引导页第三页'
    }
    NativeModules.TCAgent.trackSingle(page)
  };

  enterApp = () => {
    NativeModules.TCAgent.trackSingle('引导页第三页—进入浅言')
    AsyncStorage.setItem(consts.GUIDETAG, '1.1')
    this.props.navigation.dispatch(resetActionMain)
    NativeModules.TCAgent.trackSingle('引导页-进入浅言成功')
  }

  render () {
    return (<Swiper
      activeDot={<View style={styles.activeDot}/>}
      dot={<View style={styles.dot}/>}
      loop={false}
      onMomentumScrollEnd={this.onScrollEnd}
      dotStyle={styles.dotStyle}
      showsButtons={false}>
      <View>
        <Image resizeMode="stretch" style={styles.image} source={pageOne}/>
        <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 130}}>
          <Image resizeMode="contain" style={{width: theme.screenWidth, height: 180}} source={pageOneWord}/>
        </View>
      </View>
      <View>
        <Image resizeMode="stretch" style={styles.image} source={pageTwo}/>
        <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 120}}>
          <Image resizeMode="contain" style={{width: theme.screenWidth, height: 180}} source={pageThreeWord}/>
        </View>
      </View>
      <View>
        <Image resizeMode="stretch" style={styles.image} source={pageThree}/>
        <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 80}}>
          <Image resizeMode="contain" style={{width: theme.screenWidth, height: 180}} source={pageTwoWord}/>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: 190, height: 35, borderColor: 'white', borderRadius: 4, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: 10}}
            onPress={this.enterApp}>
            <Text style={{fontSize: 15, color: 'white'}}>开启你的故事</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>)
  }
}

const styles = StyleSheet.create({
  swiper: {
    width: theme.screenWidth,
    height: theme.screenHeight,
  },
  image: {
    width: theme.screenWidth,
    height: theme.screenHeight
  },
  activeDot: {
    backgroundColor: '#fbaf1d',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20
  },
  dot: {
    backgroundColor: '#d8d8d8',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20
  },
})
