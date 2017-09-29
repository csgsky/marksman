import React, {PureComponent} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, TextInput, ActivityIndicator, Image, KeyboardAvoidingView, NativeModules, Keyboard, Dimensions} from 'react-native'
import { bindActionCreators } from 'redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Rx from 'rxjs'
import Toast from 'react-native-root-toast'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import * as actions from '../actions/diaryAction'
import theme from '../config/theme'
import ColorPicker from '../widget/ColorPicker'
import MoodSad from '../img/mood_sad.png'
import MoodHappy from '../img/mood_happy.png'
import Album from '../img/album.png'
import LockClose from '../img/lock_close.png'
import LockOpen from '../img/lock_open.png'
import PhotoPickerModal from '../widget/PhotoPickerModal'
import DeletePhoto from '../img/photo_delete.png'


const dismissKeyboard = require('dismissKeyboard')

const screenHeight = Dimensions.get('window').height
const optionsiOS = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
  quality: 0.5,
  allowsEditing: false
}

const optionsAndroid = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
  quality: 0.5,
  allowsEditing: true
}


class WriteDiaryPage extends PureComponent {
// color: '#c37f2e',
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity
      onPress={() => navigation.state.params.content && navigation.state.params.content !== '' && navigation.state.params.handleSubmit()}>
      <Text style={[styles.save, {color: (navigation.state.params.content && navigation.state.params.content !== '') ? '#c37f2e' : '#A4A3A5'}]}>发布</Text>
    </TouchableOpacity>,
    gesturesEnabled: false,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => {navigation.goBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      showPhoto: false,
      showModal: false,
      avatarSource: null,
      color2: '#ffa3c5',
      screenHeight: screenHeight - 64 - 40,
      keyboardHeight: 258,
      suffix: ''
    };
    if (this.props.navigation.state.params.diary) {
      const diary = this.props.navigation.state.params.diary
      this.state.color2 = diary.feelcolor
    }
  }

  componentDidMount() {
    NativeModules.TCAgent.trackSingle('进入写日记页面')
    const diary = this.props.navigation.state.params.diary
    this.props.writeDiaryInit(diary)
    if (this.props.navigation.state.params.come4 === 'edit') {
      Rx.Observable.of('delay').delay(800).subscribe(() => {
        this.props.navigation.setParams({content: diary.content})
      })
    }

    this.props.navigation.setParams({
      handleSubmit: this.postDiary
    })
  }

  componentWillReceiveProps (nextProps) {
    const {success} = nextProps
    const come4 = this.props.navigation.state.params.come4
    const key = this.props.navigation.state.params.key
    if (success) {
      NativeModules.TCAgent.track('写日记', '保存成功')
      PubSub.publish('refreshDiaryList')
      dismissKeyboard()
      Toast.show('发布成功', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
      NativeModules.TCAgent.trackSingle('写日记-发布成功')
      if (come4 === 'edit') {
        this.props.navigation.goBack(key)
      } else {
        this.props.navigation.goBack()
      }
    }
  }
  componentWillUnmount () {
    this.props.cleanWritePage()
  }

  postDiary = () => {
    const {isPosting} = this.props
    dismissKeyboard()
    if (isPosting) {
      return;
    }
    NativeModules.TCAgent.trackSingle('写日记—发布')
    this.props.setPostingStatus()
    Rx.Observable.of('post').delay(500).subscribe(() => {
      this._postDiary()
    })
  }

  _postDiary = () => {
    const {ifprivate, materialPosition, imgBase64, content, postDiary, feel, navigation} = this.props
    const come4 = navigation.state.params.come4
    // const diary = this.props.navigation.state.params.diary
    NativeModules.TCAgent.track('写日记', '日记保存')
    if (materialPosition >= 0) {
      const dataOne = this.props.diary === null ?
        {content, img: materialPosition + '', ifprivate, feel, feelcolor: this.state.color2} :
        {content, img: materialPosition + '', ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}
      postDiary(dataOne, come4)
    } else if (imgBase64 !== null) {
      const dataTwo = this.props.diary === null ?
        {content, img_byte: imgBase64, ifprivate, feel, feelcolor: this.state.color2, img_suffix: this.state.suffix} :
        {content, img_byte: imgBase64, ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id, img_suffix: this.state.suffix}
      postDiary(dataTwo, come4)
    } else if (this.props.navigation.state.params.come4 === 'edit') {
      if (this.props.source === null) {
        postDiary({content, img: 'DELETE', ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}, come4)
      } else {
        postDiary({content, ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}, come4)
      }
    } else {
      postDiary({content, ifprivate, feel, feelcolor: this.state.color2}, come4)
      // postDiary({content, ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}, come4)
    }
    // 返回到日记列表页
    // const key = this.props.navigation.state.params.key
    // NativeModules.TCAgent.track('写日记', '保存成功')
    // PubSub.publish('refreshDiaryList')
    // dismissKeyboard()
    // if (come4 === 'edit') {
    //   this.props.navigation.goBack(key)
    // } else {
    //   this.props.navigation.goBack()
    // }
  }

  _closeKeyBoard = () => {
    dismissKeyboard()
  }

  getActivityIndicator = () => <TouchableOpacity activeOpacity={1}
    onPress={() => console.log('sss')}
    style={{
      position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, backgroundColor: 'transparent', justifyContent: 'center'
    }}>
    <ActivityIndicator size="large"/>
  </TouchableOpacity>

  _showPhoto = () => {
    this._closeKeyBoard()
    Rx.Observable.of('showPhoto').delay(100).subscribe(
      () => {
        this.setState({
          showPhoto: !this.state.showPhoto
        })
      }
    )
  }

  launchCamera () {
    NativeModules.TCAgent.trackSingle('写日记插入图片-拍照')
    const that = this;
    const options = Platform.OS === 'android' ? optionsAndroid : optionsiOS
    ImagePicker.launchCamera(options, (response) => {
      that.setState({
        showModal: false
      })
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        NativeModules.TCAgent.trackSingle('写日记-插入图片成功')
        const suffix = response.uri.split('.')
        this.setState({
          suffix: suffix[suffix.length - 1]
        })
        this._input.focus()
        const source = { uri: response.uri }
        const imgBase64 = response.data
        this.props.photoPicker({source, imgBase64})
      }
    })
  }


  launchImageLibrary () {
    NativeModules.TCAgent.trackSingle('写日记插入图片-从手机相册选择')
    const that = this;
    const options = Platform.OS === 'android' ? optionsAndroid : optionsiOS
    ImagePicker.launchImageLibrary(options, (response) => {
      that.setState({
        showModal: false
      })
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        NativeModules.TCAgent.trackSingle('写日记-插入图片成功')
        const suffix = response.uri.split('.')
        this.setState({
          suffix: suffix[suffix.length - 1]
        })
        this._input.focus()
        const source = { uri: 'data:image/jpg;base64,' + response.data };
        const imgBase64 = response.data
        this.props.photoPicker({source, imgBase64})
      }
    })
  }

  _onColorChanged = (color, feel) => {
    // NativeModules.TCAgent.track('写日记', '选择心情')
    this.props.writeDiaryColorChange({color, feel})
    this.setState({
      color2: color
    })
  }

  selectMaterial = (index) => {
    NativeModules.TCAgent.track('写日记', '插入图片成功')
    this._input.focus()
    this.props.selectMaterial({index})
    this.setState({
      showModal: false
    })
  }

  showDialog() {
    NativeModules.TCAgent.trackSingle('写日记—点击插入图片')
    this._closeKeyBoard()
    this.setState({
      showModal: true
    })
  }

  hideDialog() {
    NativeModules.TCAgent.trackSingle('写日记插入图片-取消')
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
        {Platform.OS === 'ios' && <View style={{flex: 1}}>
          <KeyboardAwareScrollView style={styles.view} ref="scroll"
            onKeyboardWillShow={(frames) => {
              this.setState({
                keyboardHeight: frames.endCoordinates.height,
                keyboardShow: true,
                screenHeight: screenHeight - 64- 40 - frames.endCoordinates.height
              });
            }}
            onKeyboardWillHide={(frames) => {
              this.setState({
                keyboardShow: false,
                screenHeight: screenHeight - 64 - 40
              });
            }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              const imageHeight = this.props.source ? ((theme.screenWidth - 32) * 3) / 4 : 0
              if ((contentHeight - imageHeight) > this.state.screenHeight) {
                const y = 60 + 16 + Math.max(this.state.height, 73) - this.state.screenHeight
                if (y > 0) {
                  this.refs.scroll.scrollToPosition(0, y, false)
                }
              }
            }}
            >
            <TouchableOpacity activeOpacity={1} style={{height: 60, width: theme.screenWidth}}>
              <View style={styles.time}>
                <Text style={[styles.day, {color: this.state.color2}]}>{this.props.day}</Text>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
                  <Text style={styles.week}>{this.props.date}</Text>
                  <Text style={styles.year_month}>{this.props.yymm}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                  style={{width: 100, height: 60, justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    NativeModules.TCAgent.trackSingle('写日记—设为隐私')
                    this.props.changeDiaryState()
                  }}>
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
              focus
              blurOnSubmit={false}
              ref={(c) => this._input = c}
              maxLength={1500}
              placeholder={this.props.navigation.state.params.welcome}
              onChangeText={(content) => {
                this.props.diaryContentChange({content})
                this.props.navigation.setParams({content})
              }}
              onChange={(event) => {
                this.setState({
                  height: event.nativeEvent.contentSize.height,
                });
              }}
              style={[styles.input, {height: Math.max(73, this.state.height)}]}
              value={this.props.content} />
            {this.props.source && <View style={styles.imageView}>
              <Image source={this.props.source} style={{width: theme.screenWidth - 32, height: ((theme.screenWidth - 32) * 3) / 4}} resizeMode="cover"/>
              <TouchableOpacity style={styles.deleteView}
                onPress={() => {
                  this.props.deletePhoto()
                  NativeModules.TCAgent.trackSingle('写日记—删除图片')
                }}>
                <Image style={{width: 23, height: 23}} source={DeletePhoto} resizeMode="contain"/>
              </TouchableOpacity>
              </View>}
          </KeyboardAwareScrollView>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-64}>
            <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
            <View style={{height: 40, width: theme.screenWidth, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
              <Image
                source={MoodHappy}
                resizeMode="contain"
                style={{width: 20, height: 20, marginLeft: 16, marginRight: 16}}/>
              <ColorPicker
                style={{width: theme.screenWidth - 140, height: 20}}
                defaultColor={this.state.color2}
                onColorChange={this._onColorChanged}
              />
              <Image
                source={MoodSad}
                resizeMode="contain"
                style={{width: 20, height: 20, marginLeft: 16}}/>
              <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginLeft: 16, marginRight: 16, justifyContent: 'center'}} onPress={() => this.showDialog()}>
                <Image
                  source={Album}
                  resizeMode="contain"
                  style={{width: 20, height: 20, marginLeft: 12}}/>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          </KeyboardAvoidingView>
        </View>}
        {Platform.OS === 'android' && <View style={{flex: 1}}>
          <ScrollView style={styles.view} ref="scroll">
            <TouchableOpacity activeOpacity={1} style={{height: 60, width: theme.screenWidth}}>
              <View style={styles.time}>
                <Text style={[styles.day, {color: this.state.color2}]}>{this.props.day}</Text>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
                  <Text style={styles.week}>{this.props.date}</Text>
                  <Text style={styles.year_month}>{this.props.yymm}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{width: 100, height: 60, justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    NativeModules.TCAgent.trackSingle('写日记—设为隐私')
                    this.props.changeDiaryState()
                  }}>
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
              ref={(c) => this._input = c}
              maxLength={1500}
              placeholder={this.props.navigation.state.params.welcome}
              onChangeText={(content) => {
                this.props.diaryContentChange({content})
                this.props.navigation.setParams({content})
              }}
              onChange={(event) => {
                this.setState({
                  height: event.nativeEvent.contentSize.height,
                });
              }}
              style={[styles.input, {height: Math.max(73, this.state.height)}]}
              value={this.props.content} />
            {this.props.source && <View style={styles.imageView}>
              <Image source={this.props.source} style={{width: theme.screenWidth - 32, height: ((theme.screenWidth - 32) * 3) / 4}} resizeMode="cover"/>
              <TouchableOpacity style={styles.deleteView}
                onPress={() => {
                  this.props.deletePhoto()
                  NativeModules.TCAgent.trackSingle('写日记—删除图片')
                }}>
                <Image style={{width: 23, height: 23}} source={DeletePhoto} resizeMode="contain"/>
              </TouchableOpacity>
              </View>}
          </ScrollView>
          <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          <View style={{height: 40, width: theme.screenWidth, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
            <Image
              source={MoodHappy}
              resizeMode="contain"
              style={{width: 20, height: 20, marginLeft: 16, marginRight: 16}}/>
            <ColorPicker
              style={{width: theme.screenWidth - 140, height: 25}}
              defaultColor={this.state.color2}
              onColorChange={this._onColorChanged}
            />
            <Image
              source={MoodSad}
              resizeMode="contain"
              style={{width: 20, height: 20, marginLeft: 16}}/>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginLeft: 16, marginRight: 16, justifyContent: 'center'}} onPress={() => this.showDialog()}>
              <Image
                source={Album}
                resizeMode="contain"
                style={{width: 20, height: 20}}/>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#e0e0e0', height: 0.5}}/>
          </View>
        }
        {this.props.isPosting && this.getActivityIndicator()}
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
    fontSize: 16
  },
  view: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white',
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
    width: theme.screenWidth - 32,
    height: ((theme.screenWidth - 32) * 3) / 4,
    marginTop: 0,
    marginBottom: 21
  },
  deleteView: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 23,
    height: 23
  }
})
