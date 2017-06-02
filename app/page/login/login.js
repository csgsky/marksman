import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, TouchableNativeFeedback} from 'react-native'
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
    this.state = {
      username: '13701806361',
      password: 'az19931104csg',
      loading: false
    }
  }
  componentWillReceiveProps (nextProps) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Tab'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    this.props.navigation.goBack()
  }
  render () {
    const {it} = this.props
    console.warn('render ===> ' + it)
    return (
      <View style ={{flex: 1, width: theme.screenWidth, height: theme.screenHeight, backgroundColor: 'white'}}>
          <Text style ={styles.title}>{consts.appName}</Text>
          <TextInput style ={styles.username}
            placeholder ={'请输入手机号或者邮箱'}
            placeholderTextColor = '#9d9d9d'
            underlineColorAndroid="transparent"
            defaultValue = {'13701806361'}
            onChangeText = {(username) => this.setState({username: username})}
          ></TextInput>
          <TextInput style ={styles.password}
            placeholder ={'请输入密码，不少于8位'}
            placeholderTextColor = '#9d9d9d'
            defaultValue = {'az19931104csg'}
            underlineColorAndroid="transparent"
            onChangeText = {(password) => this.setState({password: password})}
          ></TextInput>
          <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={{backgroundColor: 'rgba(248,159,51,0.7)', marginLeft: 30, marginRight: 30, marginTop: 30}}>
            <Text style={styles.login} onPress = {this.login.bind(this, this.state.username, this.state.password)}>确认</Text>
          </View>
          </TouchableNativeFeedback>
          <Text style={{color: '#4990e2', fontSize: 15, alignSelf: 'center', marginTop: 20}}>快速注册</Text>
          <View style={{flex: 1}}>
            <Text style={{color: '#9b9b9b', fontSize: 15, marginTop: 140, alignSelf: 'center'}}>忘记密码</Text>
          </View>
      </View>
    )
  }

  login (username, password) {
    dismissKeyboard()
    const {login} = this.props.actions
    login(1, '只言片语，明媚忧伤', '爱过', '1,4,5')
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
  title: {
    backgroundColor: 'white',
    color: '#f89f33',
    fontSize: 36,
    marginTop: 70,
    alignSelf: 'center'
  },
  username: {
    height: 60,
    marginTop: 20,
    fontSize: 17,
    marginLeft: 30,
    marginRight: 30
  },
  password: {
    height: 60,
    marginTop: 5,
    fontSize: 17,
    marginLeft: 30,
    marginRight: 30
  },
  login: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
    margin: 10
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  loading: {
    flex: 1,
    alignSelf: 'center'
  }
})

