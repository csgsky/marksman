import React, {Component} from 'react'
import {StyleSheet, View, Alert, Text, Image, BackAndroid, TextInput, AsyncStorage, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import Rx from 'rxjs'
import theme from '../../config/theme'
import * as consts from '../../utils/const'
import * as actions from '../../actions/registerAction'
import PasswordVisible from '../../img/password_visible.png'
import PasswordInvisible from '../../img/password_invisible.png'

// 加密使用
var CryptoJS = require('crypto-js')

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timeSubscribe: ''
    }
  }

  componentDidMount () {
    console.warn('componentDidMount')
    BackAndroid.addEventListener('hardwareBackPress', this._backPress)
  }
  componentWillReceiveProps (nextProps) {
    const {userId} = nextProps
    if (userId !== this.props.userId && userId !== '') {
      console.warn('componentWillReceiveProps ==> counter + 生成新的 token ')
      var base64 = require('base-64')
      var utf8 = require('utf8')
      var rawStr = '/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/' + userId
      var words = encodeURIComponent(rawStr)
      var base64 = base64.encode(words)
      var hmacSHA1 = CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
      // console.log('userId ==>: ' + userId)
      // console.log('hmacSHA1 ==>: ' + hmacSHA1)
      // console.log('Authorization ==>: ' + 'param=' + rawStr + '/' + hmacSHA1)
      AsyncStorage.setItem('userId', userId + '')
      AsyncStorage.setItem('token', 'param=' + rawStr + '/' + hmacSHA1).then(
          () => {
            PubSub.publish('refresh', hmacSHA1)
            this.props.actions.clearData()
            this.props.navigation.goBack(this.props.navigation.state.params.key)
          }
        )
    }
    // console.warn('componentWillReceiveProps ==> codeStatus  ' + codeStatus)
    console.warn('componentWillReceiveProps ==> counter  ' + nextProps.counter)

    if (nextProps.counter === 0) {
      this.state.timeSubscribe.unsubscribe()
      this.props.actions.codeTimeOver()
    }
  }

  render () {
    const {actions, isCounting, btnCodeText, securePassword} = this.props
    console.warn('render ==> securePassword ', securePassword)
    return (
      <View style={styles.view}>
        <Text style={styles.title}>{consts.appName}</Text>
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
              placeholder={consts.PASSWORD_PLACE_HOLDER}
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
            <Image style={styles.icon} resizeMode='contain' source={require('../../img/vel.png')} />
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
          <TouchableOpacity activeOpacity = {1} style={[styles.vertiView, {borderColor: '#8d8d8d'}]} onPress={!isCounting && this._getCode}>
            <Text>{btnCodeText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.underLine} />
        <TouchableOpacity onPress={this._login}>
          <View style={styles.confirm}>
            <Text style={styles.login}>{consts.CONFIRM}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.protocolView}>
          <Text onPress={() => { alert('协议') }} style={styles.protocol}>注册表示同意Droi服务条款内容</Text>
        </View>
      </View>
    )
  }

  _getCode = () => {
    const {isCounting, correctUsername, username} = this.props
    if (correctUsername && !isCounting) {
      this.props.actions.getVerCode(username)
      const subscribe = Rx.Observable.timer(0, 1000).subscribe(it => {
        this.props.actions.codeCounter(it)
      })
      this.setState({
        timeSubscribe: subscribe
      })
    } else {
      Alert.alert('提示', '请输入正确的手机号')
    }
  }

  componentWillUnmount() {
    if (typeof (this.state.timeSubscribe) === 'function') {
      this.state.timeSubscribe.unsubscribe()
    }
    this.props.actions.codeTimeOver()
    this.props.actions.clearData()
  }

  _login = () => {
    const {correctUsername, correctPassword, correctCode} = this.props
    console.warn('correctUsername: ' + correctUsername + ' correctPassword: ' + correctPassword + ' correctCode' + correctCode)
    this.props.navigation.goBack(this.props.navigation.state.params.key)
    if (correctUsername && correctPassword && correctCode) {
      const {username, password, code} = this.props
      this.props.actions.register(username, password, code)
    }
  }

  _backPress = () => {
    if (typeof (this.state.timeSubscribe) === 'function') {
      this.state.timeSubscribe.unsubscribe()
    }
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
    alignContent: 'center'
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
