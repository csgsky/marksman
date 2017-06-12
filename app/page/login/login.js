import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
import * as actions from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import * as consts from '../../utils/const'
var dismissKeyboard = require('dismissKeyboard')
class login extends Component {
  constructor (props) {
    super(props)
  }
  componentWillReceiveProps (nextProps) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Tab'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    // this.props.navigation.goBack()
  }
  render () {
    const {it} = this.props
    return (
      <View style ={styles.view}>
          <Text style ={styles.title}>{consts.appName}</Text>
          <TextInput style ={styles.username}
            placeholder ={consts.USERNAME_PLACE_HOLDER}
            placeholderTextColor = '#8d8d8d'
            underlineColorAndroid="transparent"
            onChangeText = {(username) => {
              // 
            }}
          ></TextInput>
          <TextInput style ={styles.password}
            placeholder ={consts.PASSWORD}
            placeholderTextColor = '#8d8d8d'
            underlineColorAndroid="transparent"
            onChangeText = {(password) => {
              // 
            }}
          ></TextInput>
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

  _login (username, password) {
    dismissKeyboard()
    alert('登录')
    // this.props.actions.login(1, '只言片语，明媚忧伤', '爱过', '1,4,5')
  }

  _quickRegister = () => {
    this.props.navigation.navigate('RegisterPage', {message: '注册'})
  }

  _forgetPassword = () => {
    alert('忘记密码 ')
  }
}

const mapStateToProps = (state) => {
  const {login} = state
  return {
    it: login.it
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(login)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30
  },
  title: {
    backgroundColor: 'white',
    color: '#f89f33',
    fontSize: 36,
    marginTop: 40,
    alignSelf: 'center'
  },
  username: {
    height: 60,
    marginTop: 20,
    fontSize: 17
  },
  password: {
    height: 60,
    marginTop: 5,
    fontSize: 17
  },
  login: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
    margin: 10
  },
  confirm: {
    backgroundColor: 'rgba(248,159,51,0.7)',
    marginTop: 30
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

