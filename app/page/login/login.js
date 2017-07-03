import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, Image, BackAndroid, TouchableOpacity, AsyncStorage} from 'react-native'
import PubSub from 'pubsub-js'
import CryptoJS from 'crypto-js'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import theme from '../../config/theme'
import * as actions from '../../actions/loginActions'
import * as consts from '../../utils/const'

// 加密使用
var dismissKeyboard = require('dismissKeyboard')

class Login extends Component {

  componentDidMount () {
    console.warn('componentDidMount')
    this.props.actions.initPage()
  }

  componentWillReceiveProps (nextProps) {
    const {userId, info} = nextProps
    if (userId !== this.props.userId && userId !== '') {
      console.log('componentWillReceiveProps ==>: 登录去吧，宝宝们')
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
            PubSub.publish('refresh', hmacSHA1)
            console.log('come4 =====> ' + this.props.navigation.state.come4)
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
    await AsyncStorage.setItem('userId', info.user_id)
    await AsyncStorage.setItem('sex', info.sex + '')
    await AsyncStorage.setItem('sign', info.sign + '')
    await AsyncStorage.setItem('nickname', info.nickname + '')
    await AsyncStorage.setItem('tags', info.tags + '')
  }

  render () {
    return (
      <View style={styles.view}>
        <Text style ={styles.title}>{consts.appName}</Text>
        <View style={styles.itemView}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={styles.icon} resizeMode="contain" source={require('../../img/tel.png')} />
          </View>
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
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={styles.icon} resizeMode='contain' source={require('../../img/password.png')} />
          </View>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <TextInput style={styles.username}
              placeholder={consts.PASSWORD_PLACE_HOLDER}
              placeholderTextColor='#8d8d8d'
              underlineColorAndroid="transparent"
              secureTextEntry={false}
              onChangeText = {(password) => {
                this.props.actions.passwordChange(password)
              }}/>
          </View>
        </View>
        <View style={styles.underLine} />
        <TouchableOpacity onPress={this._login}>
          <View style={styles.confirm}>
            <Text style={styles.login}>{consts.CONFIRM}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.register} onPress={this._quickRegister}>{consts.QUICK_REGISTER}</Text>
        <View style={styles.forgetView}>
          <Text onPress={this._forgetPassword} style={styles.forget}>{consts.FORGET_PASSWORD}</Text>
        </View>
      </View>
    )
  }

  _login = () => {
    const {account, password, correctAccount, correctPassword} = this.props
    dismissKeyboard()
    if (correctAccount && correctPassword) {
      this.props.actions.login(account, password)
    } else if (!correctAccount) {
      alert('请输入正确格式的手机号')
    } else if (!correctPassword) {
      alert('请输入正确格式的密码')
    }
  }

  _quickRegister = () => {
    const key = this.props.navigation.state.key
    this.props.navigation.navigate('RegisterPage', {key})
  }

  _forgetPassword = () => {
    alert('忘记密码 ')
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
    info: login.info
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingBottom: 15
  },
  title: {
    backgroundColor: 'white',
    color: '#f89f33',
    fontSize: 36,
    marginTop: 40,
    marginBottom: 40,
    alignSelf: 'center'
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20
  },
  forgetView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  forget: {
    color: theme.text.globalSubTextColor,
    fontSize: 15,
    alignSelf: 'center'
  }
})

