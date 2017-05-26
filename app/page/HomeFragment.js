'use strict'
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import * as actions from '../actions/homeActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as consts from '../utils/const'
import theme from '../config/theme'
var ImagePicker = require('react-native-image-picker')

// var CryptoJS = require('crypto-js')
var options = {
  title: '图片选择',
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
  allowsEditing: true,
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
      // 测试上传头像问题
      avatarSource: ''
    }
  }
  componentDidMount () {

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
        <View style={styles.toolbar}>
          <TouchableOpacity style={{width: 52,height: 52, justifyContent: 'center'}} onPress={this._onRouterMine}>
            <Image source={require('../img/mine.png')} style = {styles.profile}></Image>
          </TouchableOpacity>
          <Text style = {styles.title}>{consts.appName}</Text>
          <TouchableOpacity style={{width: 52,height: 52, alignItems: 'center', marginTop: 16}} onPress={this._onRouterSearch}>
            <Image source={require('../img/search.png')} style = {styles.search}></Image>
          </TouchableOpacity>
        </View>
        <Image source={require('../img/pen.png')} style = {styles.pen}></Image>

        <Image source={this.state.avatarSource} style={{width: 200, height: 200}}></Image>
      </View>
    )
  }

  _onRouterMine = () => {
    this.props.navigation.navigate('ProfilePage', {message: '个人主页'})
  }
  _onRouterSearch = () => {
    this.props.navigation.navigate('SearchPage',{message: '搜索'})
  }
  
  openImagePicker () {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }
        this.setState({
          value: response.data,
          avatarSource: source
        })
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

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: 'white'
  },
  title: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 130,
    color: '#6a6a6a',
    fontSize: 18
  },
  profile: {
    width: 15,
    height: 15,
    marginLeft: 16
  },
  search: {
    width: 18,
    height: 18,
    marginRight: 4
  },
  pen: {
    position: 'absolute',
    right: 20,
    top: theme.screenHeight - 150
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment)
