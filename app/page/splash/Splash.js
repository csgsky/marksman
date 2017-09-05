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
      devicedid: null,
      newOne: false,
      customer: null,
      success: false,
      img: null
    }
  }

  componentWillMount () {
    NativeModules.TCAgent.track('启动页', '启动页展现')
    this._getDeviceUserInfo()
    // 倒计时
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
  _getDeviceUserInfo = () => {
    AsyncStorage.getItem('userId').then((userId) => {
      if (userId !== null) {
        // 登录状态
        this.setState({
          success: true
        })
        // 设置背景图
        AsyncStorage.getItem('splashImage').then((image) => {
          // alert('走的是登录')
          if (image) {
            this.setState({
              img: {uri: image}
            })
          } else {
            const authorization = this._generateAuth()
            this._getSplash(authorization)
          }
        })
      } else {
        // 未登录状态
        Rx.Observable.fromPromise(NativeModules.SplashScreen.getDeviceId())
          .subscribe((imsi) => {
            AsyncStorage.getItem('devicedid').then((devicedid) => {
                // 未登录状态但已经有用户信息
              if (devicedid != null) {
                  // 设置背景图
                AsyncStorage.getItem('splashImage').then((image) => {
                  if (image) {
                    this.setState({
                      img: {uri: image}
                    })
                  } else {
                    const authorization = this._generateAuth(devicedid)
                    this._getSplash(authorization)
                  }
                })
                this.setState({
                  success: true
                })
              } else {
                  // 未登录状态，并且没有用户信息,网络请求，判断当前设备是否提交过信息
                  alert('未登录状态，并且没有用户信息,网络请求，判断当前设备是否提交过信息')
                const authorization = this._generateAuth(imsi.split('-').join(''))
                AsyncStorage.setItem('token', authorization)
                  .then(() => {
                    this._getUnLoginUserInfo(imsi.split('-').join(''), authorization)
                  })
              }
            })
          })
      }
    })
  }

  _generateAuth = (imsi) => {
    const rawStr = '/ZTE/ZTE1.1/' + imsi + '/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null'
    const words = encodeURIComponent(rawStr)
    const base64 = require('base-64').encode(words)
    const authorization = 'param=' + rawStr + '/' + CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
    return authorization
  }

  _saveUserInfo = async (customer) => {
    await AsyncStorage.setItem('sex', customer.sex + '')
    await AsyncStorage.setItem('sign', customer.sign + '')
    await AsyncStorage.setItem('nickname', customer.nickname + '')
    await AsyncStorage.setItem('tags', customer.tags + '')
  }

  _getUnLoginUserInfo = (imsi, authorization) => {
    Rx.Observable.from(getUnloginInfo(imsi + '', authorization)).subscribe(
                      (it) => {
                        this.setState({customer: it.customer, success: true})
                        if (it.customer) {
                          AsyncStorage.setItem('devicedid', it.customer.imsi)
                          this.setState({
                            newOne: false,
                          })
                          AsyncStorage.getItem('splashImage').then((image) => {
                            // alert('走的接口，是未登录, 但是有信息')
                            if (image) {
                              this.setState({
                                img: {uri: image}
                              })
                            } else {
                              this._getSplash(authorization)
                            }
                          })
                        } else {
                          this.setState({
                            newOne: true,
                            img: defaultSplash
                          })
                        }
                      }
                    )
  }

  _getSplash = (authorization) => {
    // alert('splash')
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

  _registerCustomUser = () => {
    NativeModules.TCAgent.track('引导页', '进入浅言')
    const map = {sex: 1, tags: '9', nickname: '尚未填写昵称', sign: '慵懒~是一种生活的姿态！'}
    Rx.Observable.from(NativeModules.SplashScreen.getNetInfo()).subscribe(it => {
      AsyncStorage.getItem('token').then((result) => {
        if (result) {
          Rx.Observable.from(CustomerRegisterApi(map, result))
            .subscribe((it) => {
              console.log({it})
              if (it.return_code === 1) {
                Rx.Observable.of('delay').delay(800).subscribe(() => {
                  this.props.navigation.dispatch(resetActionMain)
                })
              }
            })
        }
      })
    })
  }
  _splashRouter = () => {
    if (this.state.success) {
      if (!this.state.newOne) {
        this._saveUserInfo(this.state.customer)
        this.props.navigation.dispatch(resetActionMain)
      } else if (this.state.newOne) {
        this._registerCustomUser()
        // const resetAction = NavigationActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({routeName: 'LabelPage'})
        //   ]
        // })
        // this.props.navigation.dispatch(resetAction)
      }
    } else {
      // 重新获取设备绑定的信息
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
