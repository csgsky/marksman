import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, NativeModules, TextInput, AsyncStorage, TouchableOpacity} from 'react-native'
import Rx from 'rxjs'
import { NavigationActions } from 'react-navigation'
import Toast from 'react-native-root-toast'
import theme from '../../config/theme'
import WriteNickASign from '../../img/write_nick_sign_bg.png'
import NickNameBg from '../../img/nickname_bg.png'
import SignBg from '../../img/sign_bg.png'
import selected from '../../img//enter_qianyan.png'
import {CustomerRegisterApi} from '../../api/apis'

const dismissKeyboard = require('dismissKeyboard')

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
      sign: '慵懒~是一种生活的姿态！',
      tags: this.props.navigation.state.params.tags + '',
      sex: this.props.navigation.state.params.sex + '',
      devicedid: null
    }
  }
  componentWillMount () {
    Rx.Observable
      .fromPromise(NativeModules.SplashScreen.getDeviceId())
      .subscribe((devicedid) => {
        this.setState({
          devicedid: devicedid + '012'
        })
      })
  }

  componentDidMount () {
    NativeModules.TCAgent.track('引导页', '引导页展现')
  }


  _onPressNext = () => {
    if (this.state.nickname === null || this.state.nickname === '') {
      NativeModules.TCAgent.track('引导页', '请填写昵称提示')
      Toast.show('请填写昵称', {
        duration: Toast.durations.shor,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true
      })
    } else {
      this._registerCustomUser()
    }
  }

  _registerCustomUser = () => {
    NativeModules.TCAgent.track('引导页', '进入浅言')
    const map = {sex: this.state.sex, tags: this.state.tags, nickname: this.state.nickname, sign: this.state.sign}
    Rx.Observable.from(NativeModules.SplashScreen.getNetInfo()).subscribe(it => {
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
    })
  }

  closeKeyBoard = () => {
    dismissKeyboard()
  }

  _saveUseInfo = async () => {
    await AsyncStorage.setItem('sex', this.state.sex)
    await AsyncStorage.setItem('sign', this.state.sign === '' ? '慵懒~是一种生活的姿态！' : this.state.sign)
    await AsyncStorage.setItem('nickname', this.state.nickname)
    await AsyncStorage.setItem('tags', this.state.tags)
    await AsyncStorage.setItem('devicedid', this.state.devicedid)
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
          <Text style={{fontSize: 16, color: '#757575', backgroundColor: 'transparent'}}>写下昵称：</Text>
          <Image style={{width: theme.screenWidth - 60, height: 60, marginTop: 20}}
            resizeMode="stretch"
            source={NickNameBg}>
            <TextInput style={{fontSize: 14, height: 45, marginLeft: 16}}
              placeholder={'请写下你的昵称'}
              autoFocus
              placeholderTextColor="#a0be8a"
              underlineColorAndroid="transparent"
              maxLength={20}
              onChangeText={(nickname) => {
                NativeModules.TCAgent.track('引导页', '填写昵称')
                this.setState({
                  nickname
                })
              }}/>
          </Image>
          <View style={styles.signView}>
            <Text style={{fontSize: 16, color: '#757575', backgroundColor: 'transparent'}}>留个签名：</Text>
            <Image
              style={{width: theme.screenWidth - 60, height: 180}}
              resizeMode="stretch"
              source={SignBg}>
              <TextInput style={styles.sign}
                placeholder={'慵懒~是一种生活的姿态！'}
                placeholderTextColor="#a0be8a"
                multiline
                maxLength={20}
                underlineColorAndroid="transparent"
                onChangeText={(sign) => {
                  NativeModules.TCAgent.track('引导页', '填写签名')
                  this.setState({
                    sign
                  })
                }}/>
            </Image>
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
    marginTop: 20,
  },
  sign: {
    width: theme.screenWidth - 140,
    height: 160,
    fontSize: 14,
    paddingTop: 30,
    paddingLeft: 16,
    textAlignVertical: 'top'
  }
})
