import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import Rx from 'rxjs'
import Moment from 'moment'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import * as actions from '../actions/diaryAction'
import theme from '../config/theme'
import {getDay, getYYMM, getDate} from '../utils/TimeUtils'
import ColorPicker from '../widget/ColorPicker'
import MoodSad from '../img/mood_sad.png'
import MoodHappy from '../img/mood_happy.png'
import Album from '../img/album.png'
import LockClose from '../img/lock_close.png'
import LockOpen from '../img/lock_open.png'

const dismissKeyboard = require('dismissKeyboard')

const options = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: theme.screenWidth,
  maxHeight: (theme.screenWidth * 4) / 5,
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

class WriteDiaryPage extends Component {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleSubmit()}><Text style={styles.save}>保存</Text></TouchableOpacity>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  constructor(props) {
    super(props);
    this.state = {text: '', height: 0, showPhoto: false, avatarSource: null};
  }
  componentDidMount() {
    const diary = this.props.navigation.state.params.diary
    this.props.writeDiaryInit({diary})
    this.props.navigation.setParams({
      handleSubmit: () => {
        alert('保存日记')
      }
    })
  }

  _closeKeyBoard = () => {
    dismissKeyboard()
  }
  _showPhoto = () => {
    this._closeKeyBoard()
    Rx.Observable.of('showPhoto').delay(100).subscribe(
      it => {
        this.setState({
          showPhoto: !this.state.showPhoto
        })
      }
    )
    this.openImagePicker()
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
        const source = { uri: response.uri }
        console.log('base64: ', response.data)
        this.setState({
          avatarSource: source
        })
      }
    })
  }

  _dismissPhoto = () => {
    if (this.state.showPhoto) {
      this.setState({
        showPhoto: !this.state.showPhoto
      })
    }
  }

  _onColorChanged = (color) => {
    this.props.writeDiaryColorChange({color})
  }

  render () {
    // console.warn(getDay(Moment().format()))
    // console.warn(getYYMM(Moment().format()))
    // console.warn(getDate(Moment().format()))
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={styles.view}>
          <TouchableOpacity onPress={this._closeKeyBoard} activeOpacity={1} style={{height: 60, width: theme.screenWidth}}>
            <View style={styles.time}>
              <Text style={[styles.day, {color: this.props.color}]}>{getDay(Moment().format())}</Text>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
                <Text style={styles.week}>{getDate(Moment().format())}</Text>
                <Text style={styles.year_month}>{getYYMM(Moment().format())}</Text>
              </View>
              <TouchableOpacity style={{width: 60, height: 60, flexDirection: 'column'}}>
                <Image
                  source={LockClose}
                  resizeMode="contain"
                  style={{width: 23, height: 23}}/>
                <Text style={{fontSize: theme.text.xlgFontSize, color: theme.text.globalSubTextColor}}>公开</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TextInput
            multiline
            placeholderTextColor="#a3a3a3"
            underlineColorAndroid="transparent"
            autoFocus
            maxLength={1500}
            placeholder="今天你过得好么？"
            onChange={(event) => {
              this.setState({
                text: event.nativeEvent.text,
                height: event.nativeEvent.contentSize.height,
              });
            }}
            onFocus={this._dismissPhoto}
            style={[styles.input, {height: Math.max(35, this.state.height)}]}
            value={this.state.text} />
        </ScrollView>
        <View>
          <View style={{backgroundColor: '#e0e0e0', width: 50, height: 50, marginLeft: 16}}>
            <Image source={this.state.avatarSource} style={{width: 50, height: 50}}/>
          </View>
          <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          <View style={{height: 40, width: theme.screenWidth, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={MoodHappy}
              resizeMode="contain"
              style={{width: 20, height: 20, marginLeft: 17, marginRight: 12}}/>
            <ColorPicker
              style={{width: 200, height: 20}}
              defaultColor="#ffa3fd"
              onColorChange={this._onColorChanged}
            />
            <Image
              source={MoodSad}
              resizeMode="contain"
              style={{width: 20, height: 20, marginLeft: 12}}/>
            <TouchableOpacity style={{width: 40, height: 40, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} onPress={this._showPhoto}>
              <Image
                source={Album}
                resizeMode="contain"
                style={{width: 20, height: 20, marginLeft: 12}}/>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          {this.state.showPhoto && <View style={{height: 160, width: theme.screenWidth, backgroundColor: 'white'}} />}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({writeDiary}) => writeDiary

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WriteDiaryPage)

const styles = StyleSheet.create({
  save: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: theme.text.xxlgFontSize
  },
  view: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  input: {
    padding: 0,
    color: '#a3a3a3',
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30
  },
  time: {
    flex: 1,
    flexDirection: 'row',
  },
  day: {
    fontSize: 40
  },
  week: {
    color: theme.text.globalSubTextColor,
    fontSize: 13,
    paddingTop: 8
  },
  year_month: {
    color: theme.text.globalSubTextColor,
    fontSize: 13,
    marginTop: 3
  },
})
