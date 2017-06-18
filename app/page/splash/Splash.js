import React, {Component} from 'React'
import {StyleSheet, View, Text, Image, AsyncStorage, NativeModules} from 'react-native'
import theme from '../../config/theme'
import Rx from 'rxjs'
import consts from '../../utils/const'
import { NavigationActions } from 'react-navigation'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
const resetActionMain = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Tab'})
  ]
})
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'LabelPage'})
  ]
})
export default class Splash extends Component {

  constructor (props) {
    super (props)
    this.state = {
      time: 3,
      timeSubscribe: ''
    }
  }

  _saveUserInfo = async (info) => {
    await AsyncStorage.setItem('userId', info.user_id + '')
    await AsyncStorage.setItem('sex', info.sex + '')
    await AsyncStorage.setItem('sign', info.sign + '')
    await AsyncStorage.setItem('nickname', info.nickname + '')
    await AsyncStorage.setItem('tags', info.tags + '')
  }

  componentDidMount () {
   AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        // 游客状态 ，根据 udid 获取用户信息
        console.warn('splah ==> userId null')
        // 保存用户的基本数据
        // 网络请求，获取当前设备的信息，判断当前用户是否选过标签
        // 若没有选过标签，进入标签选择页面，直接进入职业
         AsyncStorage.setItem('token', 'param=/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null/a9a392bb28f550366c1c55f59b35aac0f94ff1eb')
         AsyncStorage.setItem('sex', '1')
         AsyncStorage.setItem('sign', '头上有个大月亮.........')
         AsyncStorage.setItem('nickname', 'allenchen')
         AsyncStorage.setItem('tags', '1,3,4,5')
      } else {

      }
   })
   const subscribe = Rx.Observable.timer(0, 1000).subscribe(it => {
      this.setState({
        time: 3 - it
      })
      if ((it + 1) === 4) {
        this.props.navigation.dispatch(resetActionMain)
      }
    })

   this.setState({
     timeSubscribe: subscribe
   })

  //  Rx.Observable.fromPromise(NativeModules.SplashScreen.getDeviceId())
  //    .subscribe(imsi => {
  //      console.warn('imsi =====>    ' + imsi)
  //      AsyncStorage.setItem('devicedid', '460022402238613')
  //    })
  }
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Image style= {styles.lable} source={require('../../img/splash.jpg')}></Image>
        </View>
        <Text style={styles.skipText} onPress={this._onPress}>跳过 {this.state.time}</Text>
      </View>
    )
  }

 _onPress = () => {
    this.state.timeSubscribe.unsubscribe()
    this.props.navigation.dispatch(resetActionMain)
  }

 componentWillUnmount() {
   this.state.timeSubscribe.unsubscribe()
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
