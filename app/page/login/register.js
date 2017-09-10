import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, BackAndroid, TextInput, AsyncStorage, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PubSub from 'pubsub-js'
import Rx from 'rxjs'
import Toast from 'react-native-root-toast'
import theme from '../../config/theme'
import * as consts from '../../utils/const'
import * as actions from '../../actions/registerAction'
import PasswordVisible from '../../img/password_visible.png'
import PasswordInvisible from '../../img/password_invisible.png'

// 加密使用
var CryptoJS = require('crypto-js')
var dismissKeyboard = require('dismissKeyboard')

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timeSubscribe: null,
      pageType: ''
    }
  }

  componentWillMount() {
    this.setState({pageType: this.props.navigation.state.params.type})
  }
  componentDidMount () {
    this._backPress()
    BackAndroid.addEventListener('hardwareBackPress', this._backPress)
  }

  componentWillReceiveProps (nextProps) {
    const {userId} = nextProps
    if (userId !== this.props.userId && userId !== '') {
      var base64 = require('base-64')
      var utf8 = require('utf8')
      var rawStr = '/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/' + userId
      var words = encodeURIComponent(rawStr)
      var base64 = base64.encode(words)
      var hmacSHA1 = CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
      AsyncStorage.setItem('userId', userId)
      AsyncStorage.setItem('token', 'param=' + rawStr + '/' + hmacSHA1).then(
          () => {
            PubSub.publish('loginRefresh', hmacSHA1)
            this.props.navigation.goBack(this.props.navigation.state.params.key)
          }
        )
    }

    if (nextProps.counter === 0) {
      if (this.state.timeSubscribe !== null && typeof (this.state.timeSubscribe) === 'object') {
        this.state.timeSubscribe.unsubscribe()
    }
      this.props.actions.codeTimeOver()
    }
  }

  render () {
    const {actions, isCounting, btnCodeText, securePassword} = this.props
    console.warn('render ==> securePassword ', securePassword)
    return (
      <KeyboardAwareScrollView>
        <TouchableOpacity style={styles.view} onPress={() => dismissKeyboard()} activeOpacity={1}>
          <TouchableOpacity
            style={{width: 18}}
            onPress={() => this.props.navigation.goBack()}>
            <Image resizeMode="contain"
              style={{width: 18, height: 18}}
              source={theme.imgs.PageBack} /></TouchableOpacity>
          <Text style={styles.title}>浅 言</Text>
          <View style={styles.itemView}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image style={styles.icon} resizeMode='contain' source={require('../../img/tel.png')} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style={styles.username}
                placeholder={consts.USERNAME_PLACE_HOLDER}
                placeholderTextColor="#8d8d8d"
                underlineColorAndroid="transparent"
                maxLength={11}
                keyboardType="numeric"
                onChangeText={(username) => {
                  actions.nicknameChange(username)
                }}/>
            </View>
          </View>
          <View style={styles.underLine} />
          <View style={[styles.itemView, {marginTop: 10}]}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image style={styles.icon} resizeMode="contain" source={require('../../img/password.png')} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style={styles.username}
                placeholder={this.state.pageType === 'register' ? consts.PASSWORD_PLACE_HOLDER : consts.PASSWORD_NEW_PLACE_HOLDER}
                placeholderTextColor="#8d8d8d"
                underlineColorAndroid="transparent"
                secureTextEntry={securePassword}
                onChangeText={(password) => {
                  actions.passwordChange(password)
                }}/>
            </View>
            <TouchableOpacity
              style={{flexDirection: 'column', justifyContent: 'center'}}
              onPress={actions.changeSecure}
              >
              <Image source={securePassword ? PasswordInvisible : PasswordVisible} style={{width: 25, height: 12}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.underLine} />
          <View style={[styles.itemView, {marginTop: 10}]}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image style={styles.icon} resizeMode="contain" source={require('../../img/vel.png')} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style={styles.username}
                placeholderTextColor="#8d8d8d"
                underlineColorAndroid="transparent"
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(code) => {
                  actions.verCodeChange(code)
                }}/>
            </View>
            <TouchableOpacity activeOpacity={1} style={[styles.vertiView, {borderColor: '#8d8d8d'}]} onPress={!isCounting && this._getCode}>
              <Text>{btnCodeText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.underLine} />
          <TouchableOpacity onPress={this._login} style={styles.confirm}>
            <Text style={styles.login}>{consts.CONFIRM}</Text>
          </TouchableOpacity>
          {this.state.pageType === 'register' && <View style={styles.protocolView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.protocol}>注册表示同意</Text>
              <Text onPress={() => this.props.navigation.navigate('CommonWebviewPage', {url: 'http://iranshao.com/', name: '用户协议', type: 'protocol'})} style={[styles.protocol, {color: '#0091EA'}]}>Droi服务条款</Text>
              <Text style={styles.protocol}>内容</Text>
            </View>
          </View>}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }

  _getCode = () => {
    const {isCounting, correctUsername, username} = this.props
    if (correctUsername && !isCounting) {
      this.props.actions.getVerCode(username, this.state.pageType)
      const subscribe = Rx.Observable.timer(0, 1000).subscribe(it => {
        this.props.actions.codeCounter(it)
      })
      this.setState({
        timeSubscribe: subscribe
      })
    } else {
      Toast.show('您输入的手机号码有误，请重新输入', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    }
  }

  componentWillUnmount() {
    if (this.state.timeSubscribe !== null && typeof (this.state.timeSubscribe) === 'object') {
      this.state.timeSubscribe.unsubscribe()
    }
    this.props.actions.codeTimeOver()
    this.props.actions.clearData()
  }

  _login = () => {
    const {correctUsername, correctPassword, correctCode} = this.props
    if (correctUsername && correctPassword && correctCode && this.state.pageType === 'forget') {
      const {username, password, code} = this.props
      this.props.actions.register(username, password, code, this.state.pageType)
    } else if (correctUsername && correctPassword && correctCode && this.state.pageType === 'register') {
      const key = this.props.navigation.state.params.key
      this.props.navigation.navigate('RegisterInfo', {type: 'register', key})
    } else if (!correctUsername) {
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

  _backPress = () => {
    if (this.state.timeSubscribe !== null && typeof (this.state.timeSubscribe) === 'object') {
      this.state.timeSubscribe.unsubscribe()
    }
    this.props.actions.codeTimeOver()
    this.props.actions.clearData()
  }
}

const mapStateToProps = (state) => {
  const {register} = state
  return {
    username: register.username,
    password: register.password,
    code: register.code,
    correctCode: register.correctCode,
    correctUsername: register.correctUsername,
    correctPassword: register.correctPassword,
    counter: register.counter,
    btnCodeText: register.btnCodeText,
    isCounting: register.isCounting,
    securePassword: register.securePassword,
    userId: register.userId
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)

const styles = StyleSheet.create({
  view: {
    width: theme.screenWidth,
    height: theme.screenHeight,
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
  confirm: {
    backgroundColor: 'rgba(248,159,51,0.7)',
    marginTop: 60
  },
  login: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
    margin: 10
  },
  protocolView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  protocol: {
    color: theme.text.globalSubTextColor,
    fontSize: 15,
    alignSelf: 'center'
  },
  vertiView: {
    flexDirection: 'column',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6
  }
})
