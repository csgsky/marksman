import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, Image, Alert, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native'
import PubSub from 'pubsub-js'
import CryptoJS from 'crypto-js'
import { NavigationActions } from 'react-navigation'
import Toast from 'react-native-root-toast'
import { bindActionCreators } from 'redux'
import * as WeChat from 'react-native-wechat'
import * as QQAPI from 'react-native-qq';
import { connect } from 'react-redux'
import theme from '../../config/theme'
import * as actions from '../../actions/loginActions'
import * as consts from '../../utils/const'
import PasswordVisible from '../../img/password_visible.png'
import PasswordInvisible from '../../img/password_invisible.png'

var dismissKeyboard = require('dismissKeyboard')

class Login extends Component {

  componentDidMount () {
    this.props.actions.initPage()
  }

  componentWillReceiveProps (nextProps) {
    const {userId, info} = nextProps
    if (userId !== this.props.userId && userId !== '') {
      var base64 = require('base-64')
      var utf8 = require('utf8')
      var rawStr = '/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/' + userId
      var words = encodeURIComponent(rawStr)
      var base64 = base64.encode(words)
      var hmacSHA1 = CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
      // console.log('userId ==>: ' + userId)
      // console.log('hmacSHA1 ==>: ' + hmacSHA1)
      // console.log('Authorization ==>: ' + 'param=' + rawStr + '/' + hmacSHA1)
      this._saveUserInfo(info)
      AsyncStorage.setItem('token', 'param=' + rawStr + '/' + hmacSHA1).then(
          () => {
            PubSub.publish('loginRefresh', hmacSHA1)
            if (this.props.navigation.state.come4 === 'signOut') {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'Tab', come4: 'login'})
                ]
              })
              this.props.navigation.dispatch(resetAction)
            }
            this.props.navigation.goBack()
          }
        )
    }
  }

  _saveUserInfo = async (info) => {
    await AsyncStorage.setItem('userId', info.user_id + '')
    await AsyncStorage.setItem('sex', info.sex + '')
    await AsyncStorage.setItem('sign', info.sign + '')
    await AsyncStorage.setItem('nickname', info.nickname + '')
    await AsyncStorage.setItem('tags', info.tags + '')
  }

  loginWeChat = () => {
    if (WeChat.isWXAppInstalled()) {
      // alert('未安装 wechat')
      WeChat.sendAuthRequest()
    } else {
      alert('未安装 wechat')
    }
  }

  loginQQ = () => {
    if (QQAPI.isQQInstalled()) {
      // sss
    } else {
      alert('未安装 qq')
    }
  }

  _login = () => {
    const {account, password, correctAccount, correctPassword} = this.props
    dismissKeyboard()
    if (correctAccount && correctPassword) {
      this.props.actions.login(account, password)
    } else if (!correctAccount) {
      Toast.show('您输入的手机号码有误，请重新输入', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    } else if (!correctPassword) {
      Toast.show('密码长度不足6位，请重新输入', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    }
  }

  _quickRegister = () => {
    const key = this.props.navigation.state.key
    this.props.navigation.navigate('RegisterPage', {key, type: 'register'})
  }

  _forgetPassword = () => {
    const key = this.props.navigation.state.key
    this.props.navigation.navigate('RegisterPage', {key, type: 'forget'})
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.view}>
          <TouchableOpacity
            style={{width: 18}}
            onPress={() => this.props.navigation.goBack()}>
            <Image resizeMode="contain"
              style={{width: 18, height: 18}}
              source={theme.imgs.PageBack} /></TouchableOpacity>
          <Text style ={styles.title}>浅 言</Text>
          <View style={styles.itemView}>
            <Image style={styles.icon} resizeMode="contain" source={require('../../img/tel.png')} />
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style={styles.username}
                placeholder={consts.USERNAME_PLACE_HOLDER}
                placeholderTextColor="#8d8d8d"
                underlineColorAndroid="transparent"
                maxLength={11}
                keyboardType="numeric"
                onChangeText={(account) => {
                  this.props.actions.usernameChagnge(account)
                }}/>
            </View>
          </View>
          <View style={styles.underLine} />
          <View style={[styles.itemView, {marginTop: 10}]}>
            <Image style={styles.icon} resizeMode='contain' source={require('../../img/password.png')} />
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style={styles.username}
                placeholder={consts.PASSWORD_PLACE_HOLDER}
                placeholderTextColor='#8d8d8d'
                underlineColorAndroid="transparent"
                secureTextEntry={this.props.securePassword}
                onChangeText={(password) => {
                  this.props.actions.passwordChange(password)
                }}/>
            </View>
            <TouchableOpacity
              style={{flexDirection: 'column', justifyContent: 'center'}}
              onPress={this.props.actions.changePasswordSecure}>
              <Image source={this.props.securePassword ? PasswordInvisible : PasswordVisible} style={{width: 25, height: 12}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.underLine} />
          <TouchableOpacity style={styles.confirm} onPress={this._login}>
            <Text style={styles.login}>{consts.CONFIRM}</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 22, marginBottom: 14, }}>
            <View style={{width: 48, height: 1, backgroundColor: '#b2b2b2'}}/>
            <Text style={{color: '#9d9d9d', marginLeft: 16, marginRight: 16, fontSize: 12}}>快速登录</Text>
            <View style={{width: 48, height: 1, backgroundColor: '#b2b2b2'}}/>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
             <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'red'}} onPress={this.loginWeChat}>

             </TouchableOpacity>
             <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'yellow', marginLeft: 43}} onPress={this.loginQQ}>

             </TouchableOpacity>
          </View>
          <View style={styles.forgetView}>
            <Text onPress={this._quickRegister}style={styles.register}>{consts.QUICK_REGISTER}</Text>
            <View style={{width: 1, height: 16, marginBottom: 4, backgroundColor: '#b2b2b2'}}/>
            <Text onPress={this._forgetPassword} style={styles.forget}>{consts.FORGET_PASSWORD}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  const {login} = state
  return {
    account: login.account,
    password: login.password,
    correctAccount: login.correctAccount,
    correctPassword: login.correctPassword,
    userId: login.userId,
    info: login.info,
    securePassword: login.securePassword
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  view: {
    height: theme.screenHeight,
    width: theme.screenWidth,
    backgroundColor: 'white',
    padding: 30,
    paddingBottom: 15
  },
  title: {
    backgroundColor: 'white',
    color: '#f89f33',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 40,
    alignSelf: 'center'
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  username: {
    height: 40,
    marginLeft: 16,
    fontSize: 17
  },
  icon: {
    width: 15,
    height: 15
  },
  underLine: {
    height: 1,
    backgroundColor: '#aeacac'
  },
  login: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
    margin: 10
  },
  confirm: {
    backgroundColor: 'rgba(248,159,51,0.7)',
    marginTop: 60
  },
  register: {
    color: '#4990e2',
    fontSize: 17,
    marginRight: 26
  },
  forgetView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 35,
    alignContent: 'center',
    justifyContent: 'center'
  },
  forget: {
    color: '#4990e2',
    fontSize: 17,
    marginLeft: 26
  }
})

