import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import Rx from 'rxjs'
import {StyleSheet, View, Text, Image, AsyncStorage, NativeModules} from 'react-native'
import theme from '../../config/theme'
import {getUnloginInfo} from '../../api/apis'


const CryptoJS = require('crypto-js')
// import consts from '../../utils/const'

// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

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
      hasdeviceUser: false,
      devicedid: '',
      newOne: false,
      customer: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('userId').then((result) => {
      if (result !== null) {
        // 登录状态
        console.warn('splah ==> userId not null')
        this.setState({
          hasdeviceUser: true
        })
      } else {
        console.warn('user id null ')
        // 未登录状态
        Rx.Observable.fromPromise(NativeModules.SplashScreen.getDeviceId())
          .subscribe((imsi) => {
            console.warn('imsi =====>    ' + imsi)
            this.setState({
              devicedid: imsi
            })
            AsyncStorage.getItem('devicedid').then((devicedid) => {
              // 未登录状态但已经有用户信息
              if (devicedid != null) {
                this.setState({
                  hasdeviceUser: true
                })
              } else {
                // 未登录状态，并且没有用户信息,网络请求，判断当前设备是否提交过信息
                const authorization = this._generateAuth()
                // console.warn('authorization  ==> ' + this._generateAuth())
                AsyncStorage.setItem('token', authorization)
                  .then(() => {
                    this._getUnLoginUserInfo(authorization)
                  })
              }
            })
          })
      }
    })

    // 倒计时
    const subscribe = Rx.Observable.timer(0, 1000).subscribe((it) => {
      this.setState({
        time: 3 - it
      })
      if ((it + 1) === 4 && this.state.hasdeviceUser) {
        if (this.state.hasdeviceUser && this.state.newOne) {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'LabelPage'})
            ]
          })
          this.props.navigation.dispatch(resetAction)
        } else if (this.state.hasdeviceUser && !this.state.newOne) {
          this._saveUserInfo(this.state.customer)
          this.props.navigation.dispatch(resetActionMain)
        } else {
          // 重新获取设备绑定的信息
          this._getUnLoginUserInfo(this.state.authorization)
        }
      }
    })

    this.setState({
      timeSubscribe: subscribe
    })
  }


// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({routeName: 'LabelPage'})
//   ]
// })


  _generateAuth = () => {
    var rawStr = '/ZTE/ZTE1.1/' + this.state.devicedid + '12122/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null'
    var words = encodeURIComponent(rawStr)
    var base64 = require('base-64').encode(words)
    const authorization = 'param=' + rawStr + '/' + CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
    this.setState({
      authorization
    })
    return authorization
  }

  componentWillUnmount() {
    this.state.timeSubscribe.unsubscribe()
  }

  _saveUserInfo = async (customer) => {
    await AsyncStorage.setItem('sex', customer.sex + '')
    await AsyncStorage.setItem('sign', customer.sign + '')
    await AsyncStorage.setItem('nickname', customer.nickname + '')
    await AsyncStorage.setItem('tags', customer.tags + '')
  }

  _getUnLoginUserInfo = (authorization) => {
    Rx.Observable.from(getUnloginInfo(this.state.devicedid + '12122', authorization)).subscribe(
                      (it) => {
                        this.setState({customer: it.customer})
                        if (it.customer) {
                          console.warn('未登录，但是有信息，保存信息，直接到主页')
                          this.setState({
                            hasdeviceUser: true,
                            newOne: false
                          })
                        } else {
                          console.warn('未登录，并且没有信息，跳到 label 页面')
                          this.setState({
                            hasdeviceUser: true,
                            newOne: true
                          })
                        }
                      }
                    )
  }
  _onPress = () => {
    if (this.state.hasdeviceUser && this.state.newOne) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'LabelPage'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else if (this.state.hasdeviceUser && !this.state.newOne) {
      this._saveUserInfo(this.state.customer)
      this.props.navigation.dispatch(resetActionMain)
    } else {
      // 重新获取设备绑定的信息
      this._getUnLoginUserInfo(this.state.authorization)
    }
    // this.state.timeSubscribe.unsubscribe()
    // this.props.navigation.dispatch(resetActionMain)
  }

  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Image style={styles.lable} source={require('../../img/splash.png')} />
        </View>
        <Text style={styles.skipText} onPress={this._onPress}>跳过 {this.state.time}</Text>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenHeight
  },
  skipText: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#dcdddd',
    fontSize: 13,
    color: '#ffffff',
    alignSelf: 'center',
    paddingTop: 4,
    paddingLeft: 12,
    paddingRight: 10
  }
})
