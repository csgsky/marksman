import React, {Component} from 'React'
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
import * as consts from '../../utils/const'
import * as actions from '../../actions/registerAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Rx from 'rxjs'
import { NavigationActions } from 'react-navigation'
const backAction = NavigationActions.back({
    key: 'ProfilePage'
})
class Register extends Component {
  constructor (props) {
    super (props)
    this.state = {
      timeSubscribe: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.counter === 0) {
      this.state.timeSubscribe.unsubscribe()
      this.props.actions.codeTimeOver()
    }
  }
  render () {
    const {actions, username, password, code, counter, isCounting, btnCodeText} = this.props
    return (
      <View style={styles.view}>
         <Text style ={styles.title}>{consts.appName}</Text>
          <View style={styles.itemView}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image style={styles.icon} source={require('../../img/comment_share.png')} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style ={styles.username}
                         placeholder ={consts.USERNAME_PLACE_HOLDER}
                         placeholderTextColor = '#8d8d8d'
                         underlineColorAndroid="transparent"
                         maxLength = {11}
                         keyboardType="numeric"
                         onChangeText = {(username) => {
                           actions.nicknameChange(username)
                         }}/>
            </View>
          </View>
          <View style={styles.underLine}></View>
          <View style={[styles.itemView, {marginTop: 10}]}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image style={styles.icon} source={require('../../img/comment_share.png')} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style ={styles.username}
                         placeholder ={consts.PASSWORD_PLACE_HOLDER}
                         placeholderTextColor = '#8d8d8d'
                         underlineColorAndroid="transparent"
                         onChangeText = {(password) => {
                           actions.passwordChange(password)
                         }}/>
            </View>
          </View>
          <View style={styles.underLine}></View>
          <View style={[styles.itemView, {marginTop: 10}]}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Image style={styles.icon} source={require('../../img/comment_share.png')} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <TextInput style ={styles.username}
                         placeholderTextColor = '#8d8d8d'
                         underlineColorAndroid="transparent"
                         maxLength = {6}
                         keyboardType="numeric"
                         onChangeText = {(code) => {
                           actions.verCodeChange(code)
                         }}/>
            </View>
            <TouchableOpacity activeOpacity = {1} style={[styles.vertiView, {borderColor: '#8d8d8d'}]} onPress = {!isCounting && this._getCode}>
              <Text>{btnCodeText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.underLine}></View>
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

  _login = () => {
    // const{correctUsername} = this.props
    // if (correctUsername) {
    //   alert('username')
    // }
    alert('username')
    this.props.navigation.dispatch(backAction)
      
  }

  _getCode = () => {
    // alert('获取验证码')
    const {getVerCode, codeCounter, isCounting} = this.props.actions
    const subscribe = Rx.Observable.timer(0, 1000).subscribe(it => {
      codeCounter(it)
    })
    this.setState({
     timeSubscribe: subscribe
    })
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
    counter: register.counter,
    btnCodeText: register.btnCodeText,
    isCounting: register.isCounting
  }
}

const mapDispatchToProps = (dispatch) => ({
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
