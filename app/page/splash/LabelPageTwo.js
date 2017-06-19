import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TextInput, AsyncStorage, NativeModules, TouchableOpacity} from 'react-native'
import Rx from 'rxjs'
import { NavigationActions } from 'react-navigation'
import theme from '../../config/theme'
import WriteNickASign from '../../img/write_nick_sign_bg.png'
import NickNameBg from '../../img/nickname_bg.png'
import SignBg from '../../img/sign_bg.png'
import selected from '../../img/splash_selected.png'
import {CustomerRegisterApi} from '../../api/apis'
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
      sign: ''
    }
  }
  _onPressNext = () => {
    // this._saveUseInfo()
    if (this.state.nickname !== null && this.state.sign !== null) {
      console.warn('tags: ' + this.props.navigation.state.params.tags)
      this._registerCustomUser()
    }
    
    // alert('nickName ==> ' + this.state.nickname + ' sign ==> ' + this.state.sign)
  }

  _registerCustomUser = () => {
    const map = {sex: this.props.navigation.state.params.sex, tags: this.props.navigation.state.params.tags, nickname: this.state.nickname, sign: this.state.sign}
    AsyncStorage.getItem('token').then((result) => {
      if (result) {
        Rx.Observable.from(CustomerRegisterApi(map, result)).subscribe(
                      (it) => {
                        if (it.return_code === 1) {
                          console.warn('bingo')
                          this._saveUseInfo()
                          this.props.navigation.dispatch(resetAction)
                        }
                      }
                    )
      }
    })
    
  }

  _saveUseInfo = async () => {
    await AsyncStorage.setItem('sex', this.props.navigation.state.params.sex + '')
    await AsyncStorage.setItem('sign', this.state.sign)
    await AsyncStorage.setItem('nickname', this.state.nickname)
    await AsyncStorage.setItem('tags', this.props.navigation.state.params.tags)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style ={{flex: 1, position: 'absolute'}}>
          <Image style={{flex: 1, width: theme.screenWidth, height: theme.screenHeight}}
            esizeMode="stretch"
            source={WriteNickASign} />
        </View>
        <View style={styles.view}>
          <Text style={{fontSize: 16, color: '#757575', backgroundColor: 'transparent'}}>请写下你的昵称：</Text>
          <View style={styles.nicknameView}>
            <Image style={{width: 280, height: 60}}
              resizeMode="contain"
              source={NickNameBg} />
            <TextInput style={styles.nickname}
              placeholder={'请写下你的昵称'}
              placeholderTextColor='#a0be8a'
              underlineColorAndroid="transparent"
              maxLength={11}
              onChangeText={(nickname) => {
                this.setState({
                  nickname
                })
              }}/>
          </View>
          <View style={styles.signView}>
            <Image
              style={{width: 300, height: 130}}
              resizeMode="contain"
              source={SignBg} />
            <TextInput style={styles.sign}
              placeholder={'请留下你的只言片语，让如诗的日子杨帆起航~~'}
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'absolute',
    padding: 16,
    flexDirection: 'column',
    top: 160,
    left: 16,
    right: 16,
    bottom: 0
  },
  nicknameView: {
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20
  },
  nickname: {
    position: 'absolute',
    left: 20,
    right: 10
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
    textAlignVertical: 'top'
  }
})
