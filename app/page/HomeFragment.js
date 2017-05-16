'use strict'
import React, {Component} from 'react'
import {Text, View, AsyncStorage, TouchableOpacity} from 'react-native'
import * as actions from '../actions/homeActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
var ImagePicker = require('react-native-image-picker')

// var CryptoJS = require('crypto-js')
var options = {
  title: '图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 600,
  maxHeight: 600,
  aspectX: 2,
  aspectY: 1,
  quality: 0.8,
  angle: 0,
  allowsEditing: false,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
class HomeFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      slug: ''
    }
  }
  componentDidMount () {
    const { homeInit } = this.props.actions
    // 获取 token
    AsyncStorage.getItem('token').then(
      (result) => {
        if (result) {
          homeInit(result)
        } else {
          console.log('HomeFragment token ===> ')
        }
      }
    )
  }

  render () {
    // var keyHex = CryptoJS.enc.Base64.parse('rUqSznmiv78=') // 客户端 和 服务端 约定的一种秘钥
    // var encrypted = CryptoJS.DES.encrypt('87654321', keyHex, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // })
    // console.log('==============加密：' + encrypted.toString())
    // var decrypted = CryptoJS.DES.decrypt({
    //   ciphertext: CryptoJS.enc.Base64.parse(encrypted.toString())}, keyHex, {
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    //   })
    // console.log('==============解密：' + decrypted.toString(CryptoJS.enc.Utf8))

    return (
      <View>
        <Text>哈哈哈哈哈囖囖囖</Text>
      </View>
    )
  }

  openImagePicker () {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }
        console.log(source)
      }
    })
  }
}

const mapStateToProps = (state) => {
  const {homePage} = state
  return {
    isRefreshing: homePage.isRefreshing
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment)
