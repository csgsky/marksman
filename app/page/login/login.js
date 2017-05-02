import React from 'React'
import {StyleSheet, View, Text, TextInput, TouchableNativeFeedback, ActivityIndicator, AsyncStorage} from 'react-native'
import theme from '../../config/theme'
import MainPage from '../../page/MainPage'
import PageComponent from '../../component/BackPageComponent'
import * as actions from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

var dismissKeyboard = require('dismissKeyboard')

class login extends PageComponent {
  constructor (props) {
    super(props)
    this.state = {
      username: '13701806361',
      password: 'az19931104csg',
      loading: false
    }
  }
  componentWillReceiveProps (nextProps) {
    const {slug, token} = nextProps
    console.log('componentWillReceiveProps  slug ==>' + slug)
    console.log('componentWillReceiveProps  token ==>' + token)
    if (token) {
      AsyncStorage.setItem('token', token).then(
            () => {
              console.log('token 保存成功!')
            }
          )
    }
    if (slug) {
      AsyncStorage.setItem('slug', slug).then(
            () => {
              console.log('slug 保存成功!')
            }
          )
      this.props.navigator.replace({component: MainPage})
    }
  }
  render () {
    return (
      <View style = {{backgroundColor: 'white', height: theme.screenHeight, width: theme.screenWidth}}>
        <Text style ={styles.title}>欢迎来到爱燃烧</Text>
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
        <View style={{backgroundColor: 'red', marginLeft: 30, marginRight: 30, marginTop: 30}}>
        <Text style={styles.login} onPress = {this.login.bind(this, this.state.username, this.state.password)}>登录</Text>
        </View>
        </TouchableNativeFeedback>
        {this.state.loading && <View style = {styles.blur}>
          <ActivityIndicator animating={this.state.loading} style ={styles.loading} size ='large'/>
        </View>}
      </View>
    )
  }

  login (username, password) {
    dismissKeyboard()
    const {login} = this.props.actions
    login(username, password)
    this.setState({
      loading: true
    })
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    slug: state.login.slug
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(login)

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 28,
    marginLeft: 30,
    marginTop: 70
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

