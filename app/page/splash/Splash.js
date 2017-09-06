import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import Rx from 'rxjs'
import {StyleSheet, View, Text, Image, AsyncStorage, NativeModules, Platform} from 'react-native'
import theme from '../../config/theme'
import {getUnloginInfo, splashApi, CustomerRegisterApi} from '../../api/apis'
import defaultSplash from '../../img/splash.png'

const CryptoJS = require('crypto-js')

const resetActionMain = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Tab'})
  ]
})
export default class Splash extends Component {

  constructor (props) {
    super(props)
    this.state = {
      time: 3,
      timeSubscribe: '',
      success: false,
      img: null
    }
  }

  componentWillMount () {
    NativeModules.TCAgent.track('启动页', '启动页展现')
    this._getDeviceUserInfo()
    const subscribe = Rx.Observable.timer(0, 1000).subscribe((it) => {
      if ((it + 1) === 4) {
        this._splashRouter()
      }
    })
    this.setState({
      timeSubscribe: subscribe
    })
  }

  componentWillUnmount() {
    this.state.timeSubscribe.unsubscribe()
  }


  setSplashImg = () => {
     // 设置背景图
    AsyncStorage.getItem('splashImage').then((image) => {
      if (image) {
        this.setState({
          img: {uri: image}
        })
      } else {
        const authorization = this._generateAuth()
        this._getSplash(authorization)
      }
    })
  }

  _getDeviceUserInfo = () => {
    this.setSplashImg()
    AsyncStorage.getItem('userId').then((userId) => {
      if (userId !== null) {
        this.setState({
          success: true
        })
      } else {
        Rx.Observable.fromPromise(NativeModules.SplashScreen.getDeviceId())
          .subscribe((imsi) => {
            const token = this.unLoginToken(imsi.split('-').join(''))
            this._saveUserInfo(token)
          })
      }
    })
  }

  unLoginToken = (imsi) => {
    const rawStr = '/ZTE/ZTE1.1/' + imsi + 'oppppo/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null'
    const words = encodeURIComponent(rawStr)
    const base64 = require('base-64').encode(words)
    const authorization = 'param=' + rawStr + '/' + CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
    return authorization
  }

  _saveUserInfo = async (token) => {
    await AsyncStorage.setItem('sex', '1')
    await AsyncStorage.setItem('sign', '慵懒~是一种生活的姿态！')
    await AsyncStorage.setItem('nickname', '尚未填写昵称')
    await AsyncStorage.setItem('tags', '9')
    await AsyncStorage.setItem('token', token)
    this.setState({
      success: true
    })
  }

  _getSplash = (authorization) => {
    Rx.Observable
      .from(splashApi(authorization))
      .subscribe((it) => {
        if (it.return_code === 1) {
          AsyncStorage.setItem('splashImage', it.img_url)
          this.setState({
            img: {uri: it.img_url}
          })
        } else {
          this.setState({
            img: defaultSplash
          })
        }
      })
  }

  _onPress = () => {
    NativeModules.TCAgent.track('启动页', '启动页跳过')
    this._splashRouter()
  }

  // _registerCustomUser = () => {
  //   NativeModules.TCAgent.track('引导页', '进入浅言')
  //   const map = {sex: 1, tags: '9', nickname: '尚未填写昵称', sign: '慵懒~是一种生活的姿态！'}
  //   Rx.Observable.from(NativeModules.SplashScreen.getNetInfo()).subscribe(it => {
  //     AsyncStorage.getItem('token').then((result) => {
  //       if (result) {
  //         Rx.Observable.from(CustomerRegisterApi(map, result))
  //           .subscribe((it) => {
  //             if (it.return_code === 1) {
  //               Rx.Observable.of('delay').delay(800).subscribe(() => {
  //                 this.props.navigation.dispatch(resetActionMain)
  //               })
  //             }
  //           })
  //       }
  //     })
  //   })
  // }

  _splashRouter = () => {
    if (this.state.success) {
      this.props.navigation.dispatch(resetActionMain)
    } else {
      this._getDeviceUserInfo()
    }
  }

  render () {
    return (
      <View>
        <Image style={styles.lable} resizeMode="stretch" source={this.state.img} />
        <View style={[styles.skipText, {alignItems: 'center', justifyContent: 'center'}]}>
          <Text style={{color: 'white', fontSize: 13}} onPress={this._onPress}>跳过</Text>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? theme.screenHeight : theme.screenHeight - 20
  },
  skipText: {
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.4)',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    height: 28,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(52,52,52,0.4)',
    paddingLeft: 12,
    paddingRight: 10
  }
})
