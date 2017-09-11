import React, { Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput, AsyncStorage} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-root-toast'
import PubSub from 'pubsub-js'

import theme from '../../config/theme'
import * as actions from '../../actions/registerAction'
import PhotoPickerModal from '../../widget/PhotoPickerModal'

// 加密使用
var CryptoJS = require('crypto-js')
const dismissKeyboard = require('dismissKeyboard')

const options = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
  quality: 0.5,
  allowsEditing: true
}
class RegisterInfo extends Component {

  constructor (props) {
    super(props)
    this.state = {
      source: null,
      imgByte: null,
      suffix: '',
      nickname: '',
      pageType: '',
      showPhotoPickerModal: false,
    }
  }

  componentWillMount() {
    // this.setState({pageType: this.props.navigation.state.params.type})
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
  }
  getSource = () => {
    if (this.state.source) {
      return this.state.source
    }
    return theme.imgs.DefaultUserAvatar
  }

  showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    })
  }

  submit = () => {
    if (this.state.source === null) {
      this.showToast('请上传头像')
    } else if (this.state.nickname === '') {
      this.showToast('请填写昵称')
    } else {
      dismissKeyboard()
      this._login()
    }
  }

  _login = () => {
    const {username, password, code} = this.props
    this.props.register(username, password, code, this.state.pageType, this.state.nickname, this.state.imgByte, this.state.suffix)
  }

  launchCamera () {
    dismissKeyboard()
    ImagePicker.launchCamera(options, (response) => {
      this.setState({
        showPhotoPickerModal: false
      })
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const suffix = response.uri.split('.')
        const imgBase64 = response.data
        this.setState({
          source: {uri: response.uri},
          suffix: suffix[suffix.length - 1],
          imgByte: imgBase64
        })
      }
    })
  }

  launchImageLibrary () {
    dismissKeyboard()
    ImagePicker.launchImageLibrary(options, (response) => {
      this.setState({
        showPhotoPickerModal: false
      })
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const suffix = response.uri.split('.')
        const imgBase64 = response.data
        this.setState({
          source: {uri: response.uri},
          suffix: suffix[suffix.length - 1],
          imgByte: imgBase64
        })
      }
    })
  }

  hideDialog() {
    this.setState({
      showPhotoPickerModal: false
    })
  }

  render () {
    return (<View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <PhotoPickerModal
        _dialogVisible={this.state.showPhotoPickerModal}
        hide={() => this.hideDialog()}
        launchCamera={() => this.launchCamera()}
        launchImageLibrary={() => this.launchImageLibrary()}
      />
      <TouchableOpacity onPress={() => {
        this.setState({showPhotoPickerModal: true})
      }}
        activeOpacity={0.8}
        style={{marginTop: 80}}>
        <Image style={styles.avtar} source={this.getSource()}/>
      </TouchableOpacity>
      <Text style={styles.reminder}>请上传您的头像</Text>
      <View style={styles.nicknameView}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          maxLength={14}
          onChangeText={(content) => {
            this.setState({
              nickname: content
            })
          }}
          placeholder="请填写您的昵称"
        />
      </View>
      <TouchableOpacity
        onPress={this.submit}
        activeOpacity={0.8}
        style={styles.submit}>
        <Text style={styles.submitText}>提 交</Text>
      </TouchableOpacity>
    </View>)
  }
}

const mapStateToProps = (state) => {
  const {register} = state
  return {
    username: register.username,
    password: register.password,
    code: register.code,
    userId: register.userId
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInfo)

const styles = StyleSheet.create({
  avtar: {
    width: theme.screenWidth / 6,
    height: theme.screenWidth / 6,
    borderRadius: theme.screenWidth / 12
  },
  reminder: {
    fontSize: 14,
    color: theme.text.globalSubTextColor,
    marginTop: 8
  },
  nicknameView: {
    borderColor: '#f4b66c',
    borderWidth: 1,
    marginTop: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.screenWidth - 50
  },
  input: {
    fontSize: 15,
    position: 'absolute',
    left: 5,
    right: 0,
    bottom: 0,
    top: 0
  },
  submit: {
    height: 45,
    width: theme.screenWidth - 50,
    marginTop: 25,
    backgroundColor: '#f4b66c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    fontWeight: '500',
    fontSize: 15,
    color: 'white'
  }

})
