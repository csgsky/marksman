import React, { Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-root-toast'
import theme from '../../config/theme'

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
export default class RegisterInfo extends Component {

  constructor (props) {
    super(props)
    this.state = {
      source: null,
      imgByte: null,
      suffix: '',
      nickname: ''
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
      alert(this.state.imgByte)
    }
  }

  chooseImage = () => {
    dismissKeyboard()
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        alert('取消')
      } else if (response.error) {
        alert('错误')
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

  render () {
    return (<View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <TouchableOpacity onPress={this.chooseImage} activeOpacity={0.8} style={{marginTop: 80}}>
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
    width: theme.screenWidth - 50
  },
  input: {
    fontSize: 15,
    marginLeft: 4,
    backgroundColor: 'white'
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
