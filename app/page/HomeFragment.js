'use strict'
import React, {Component} from 'react'
import {Text, View, AsyncStorage, TouchableOpacity} from 'react-native'
import * as actions from '../actions/homeActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
var ImagePicker = require('react-native-image-picker')
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
          console.log('HomeFragment token ===> ' + result)
          homeInit(result)
        } else {
          console.log('HomeFragment token ===> ')
        }
      }
    )
  }

  render () {
    return (
      <TouchableOpacity onPress={this.openImagePicker}>
        <Text>点击打开相机</Text>
      </TouchableOpacity>
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
