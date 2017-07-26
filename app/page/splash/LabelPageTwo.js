import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TextInput, AsyncStorage, TouchableOpacity} from 'react-native'
import Rx from 'rxjs'
import { NavigationActions } from 'react-navigation'
import theme from '../../config/theme'
import WriteNickASign from '../../img/write_nick_sign_bg.png'
import NickNameBg from '../../img/nickname_bg.png'
import SignBg from '../../img/sign_bg.png'
import selected from '../../img//enter_qianyan.png'
import {CustomerRegisterApi} from '../../api/apis'

var dismissKeyboard = require('dismissKeyboard')
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Tab'})
  ]
})
export default class LabelPageTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: null,
      sign: '',
      tags: this.props.navigation.state.params.tags + '',
      sex: this.props.navigation.state.params.sex + ''
    }
  }
  _onPressNext = () => {
    if (this.state.nickname !== '') {
      this._registerCustomUser()
    }
  }

  _registerCustomUser = () => {
    const map = {sex: this.state.sex, tags: this.state.tags, nickname: this.state.nickname, sign: this.state.sign}
    AsyncStorage.getItem('token').then((result) => {
      if (result) {
        Rx.Observable.from(CustomerRegisterApi(map, result)).subscribe(
                      (it) => {
                        if (it.return_code === 1) {
                          this._saveUseInfo()
                          Rx.Observable.of('delay').delay(800).subscribe(() => {
                            this.props.navigation.dispatch(resetAction)
                          })
                        }
                      }
                    )
      }
    })
  }

  closeKeyBoard = () => {
    dismissKeyboard()
  }

  _saveUseInfo = async () => {
    console.log('save --> ', this.state.tags)
    await AsyncStorage.setItem('sex', this.state.sex)
    await AsyncStorage.setItem('sign', this.state.sign === '' ? '慵懒~是一种生活的姿态！' : this.state.sign)
    await AsyncStorage.setItem('nickname', this.state.nickname)
    await AsyncStorage.setItem('tags', this.state.tags)
  }

  render() {
    return (
      <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={this.closeKeyBoard}>
        <View style ={{flex: 1, position: 'absolute'}}>
          <Image style={{flex: 1, width: theme.screenWidth, height: theme.screenHeight}}
            esizeMode="stretch"
            source={WriteNickASign} />
        </View>
        <TouchableOpacity style={styles.view} activeOpacity={1} onPress={this.closeKeyBoard}>
          <Text style={{fontSize: 16, marginLeft: 8, color: '#757575', backgroundColor: 'transparent'}}>请写下你的昵称：</Text>
          <Image style={{width: theme.screenWidth - 60, height: 60, marginTop: 30}}
            resizeMode="stretch"
            source={NickNameBg}>
            <TextInput style={{fontSize: 14, height: 45, marginLeft: 21}}
              placeholder={'请写下你的昵称'}
              autoFocus
              placeholderTextColor="#a0be8a"
              underlineColorAndroid="transparent"
              maxLength={11}
              onChangeText={(nickname) => {
                this.setState({
                  nickname
                })
              }}/>
            </Image>
          <View style={styles.signView}>
            <Image
              style={{width: theme.screenWidth - 60, height: 130}}
              resizeMode="stretch"
              source={SignBg} />
            <TextInput style={styles.sign}
              placeholder={'慵懒~是一种生活的姿态！'}
              placeholderTextColor="#a0be8a"
              multiline
              underlineColorAndroid="transparent"
              onChangeText={(sign) => {
                this.setState({
                  sign
                })
              }}/>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={this._onPressNext} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 160, height: 36}}
              source={selected}
              resizeMode="stretch"/>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'absolute',
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white',
    top: 160,
    left: 16,
    right: 16,
    bottom: 0
  },
  signView: {
    height: 130,
    marginTop: 20,
  },
  sign: {
    position: 'absolute',
    height: 130,
    left: 20,
    right: 60,
    top: 20,
    fontSize: 14,
    textAlignVertical: 'top'
  }
})
