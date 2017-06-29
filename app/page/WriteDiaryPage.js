import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, TextInput, Image, KeyboardAvoidingView} from 'react-native'
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
import PhotoPickerModal from '../widget/PhotoPickerModal'
import DeletePhoto from '../img/photo_delete.png'

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
  maxHeight: theme.screenHeight,
  quality: 1,
  aspectX: 2,
  aspectY: 1,
  angle: 0,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class WriteDiaryPage extends Component {
// color: '#c37f2e',
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity
      onPress={() => navigation.state.params.content && navigation.state.params.content !== '' && navigation.state.params.handleSubmit()}>
      <Text style={[styles.save, {color: (navigation.state.params.content && navigation.state.params.content !== '') ? '#c37f2e' : '#A4A3A5'}]}>保存</Text>
    </TouchableOpacity>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  constructor(props) {
    super(props);
    this.state = {text: '', height: 0, showPhoto: false, showModal: false, avatarSource: null};
  }

  componentDidMount() {
    const diary = this.props.navigation.state.params.diary
    this.props.writeDiaryInit({diary})
    this.props.navigation.setParams({
      handleSubmit: this._postDiary
    })
  }

  componentWillReceiveProps (nextProps) {
    const {success} = nextProps
    if (success) {
      this.props.cleanWritePage()

      this.props.navigation.goBack()
    }
  }

  _postDiary = () => {
    const {ifprivate, materialPosition, imgBase64, content, postDiary, feel, color} = this.props
    console.warn('content ===> ' + content)
    if (materialPosition > 0) {
      console.warn('imgPosition ===> ' + materialPosition)
      postDiary({content, img: materialPosition + '', ifprivate, feel, feelcolor: color})
    } else if (imgBase64 !== null) {
      postDiary({content, img_byte: imgBase64, ifprivate, feel, feelcolor: color})
    } else if (materialPosition < 0 && imgBase64 === null && (content === null || content === '')) {
      alert('不能为空 ' + color)
    } else {
      postDiary({content, ifprivate, feel, feelcolor: color})
    }
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
  }

  launchCamera () {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        const imgBase64 = response.data
        this.props.photoPicker({source, imgBase64})
      }
    })
    this.setState({
      showModal: false
    })
  }


  launchImageLibrary () {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        const imgBase64 = response.data
        this.props.photoPicker({source, imgBase64})
      }
    })

    this.setState({
      showModal: false
    })
  }

  _onColorChanged = (color, feel) => {
    this.props.writeDiaryColorChange({color, feel})
  }

  selectMaterial = (index) => {
    this.props.selectMaterial({index})
    this.setState({
      showModal: false
    })
  }

  showDialog() {
    this._closeKeyBoard()
    this.setState({
      showModal: true
    })
  }

  hideDialog() {
    this._closeKeyBoard()
    this.setState({
      showModal: false
    })
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <PhotoPickerModal
          _dialogVisible={this.state.showModal}
          hide={() => this.hideDialog()}
          launchCamera={() => this.launchCamera()}
          launchImageLibrary={() => this.launchImageLibrary()}
          selectMaterial={this.selectMaterial}
          materialPosition={this.props.materialPosition}
          />
        <ScrollView style={styles.view}>
          <TouchableOpacity activeOpacity={1} style={{height: 60, width: theme.screenWidth}}>
            <View style={styles.time}>
              <Text style={[styles.day, {color: this.props.color}]}>{getDay(Moment().format())}</Text>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
                <Text style={styles.week}>{getDate(Moment().format())}</Text>
                <Text style={styles.year_month}>{getYYMM(Moment().format())}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={{width: 60, height: 60, flexDirection: 'column'}} onPress={this.props.changeDiaryState}>
                <Image
                  source={this.props.ifprivate === 1 ? LockOpen : LockClose}
                  resizeMode="contain"
                  style={{width: 23, height: 23}}/>
                <Text style={{fontSize: theme.text.xlgFontSize, color: theme.text.globalSubTextColor}}>{this.props.ifprivate === 1 ? '公开' : '私密'}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TextInput
            multiline
            placeholderTextColor="#a3a3a3"
            underlineColorAndroid="transparent"
            autoFocus
            maxLength={1500}
            placeholder="今天你过的好么？"
            onChangeText={(content) => {
              this.props.diaryContentChange({content})
              this.props.navigation.setParams({content})
            }}
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
        {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-64}>
          <View>
            {this.props.source && <View style={styles.imageView}>
              <Image source={this.props.source} style={{width: 80, height: 40}}/>
              <TouchableOpacity style={styles.deleteView} onPress={this.props.deletePhoto}>
                <Image style={{width: 15, height: 15}} source={DeletePhoto} resizeMode="contain"/>
              </TouchableOpacity>
              </View>}
            <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
            <View style={{height: 40, width: theme.screenWidth, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={MoodHappy}
                resizeMode="contain"
                style={{width: 20, height: 20, marginLeft: 16, marginRight: 16}}/>
              <ColorPicker
                style={{width: 200, height: 20}}
                defaultColor="#ffa3c5"
                onColorChange={this._onColorChanged}
              />
              <Image
                source={MoodSad}
                resizeMode="contain"
                style={{width: 20, height: 20, marginLeft: 16}}/>
              <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginRight: 16, justifyContent: 'flex-end'}} onPress={() => this.showDialog()}>
                <Image
                  source={Album}
                  resizeMode="contain"
                  style={{width: 20, height: 20, marginLeft: 12}}/>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          </View>
        </KeyboardAvoidingView>}
        {Platform.OS === 'android' && <View>
            {this.props.source && <View style={styles.imageView}>
              <Image source={this.props.source} style={{width: 80, height: 40}}/>
              <TouchableOpacity style={styles.deleteView} onPress={this.props.deletePhoto}>
                <Image style={{width: 15, height: 15}} source={DeletePhoto} resizeMode="contain"/>
              </TouchableOpacity>
              </View>}
          <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          <View style={{height: 40, width: theme.screenWidth, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={MoodHappy}
              resizeMode="contain"
              style={{width: 20, height: 20, marginLeft: 16, marginRight: 16}}/>
            <ColorPicker
              style={{width: 200, height: 20}}
              defaultColor="#ffa3c5"
              onColorChange={this._onColorChanged}
            />
            <Image
              source={MoodSad}
              resizeMode="contain"
              style={{width: 20, height: 20, marginLeft: 16}}/>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginRight: 16, justifyContent: 'flex-end'}} onPress={() => this.showDialog()}>
              <Image
                source={Album}
                resizeMode="contain"
                style={{width: 20, height: 20, marginLeft: 12}}/>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = ({writeDiary}) => writeDiary

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WriteDiaryPage)

const styles = StyleSheet.create({
  save: {
    color: '#A4A3A5',
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
  imageView: {
    width: 80,
    height: 40,
    marginLeft: 16,
    marginBottom: 11
  },
  deleteView: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 15,
    height: 15
  }
})
