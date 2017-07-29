import React, {PureComponent} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, TextInput, Image, KeyboardAvoidingView, Keyboard, Dimensions} from 'react-native'
import { bindActionCreators } from 'redux'
import Rx from 'rxjs'
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
const options = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
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
      screenHeight: screenHeight - 64
    };
    if (this.props.navigation.state.params.diary) {
      const diary = this.props.navigation.state.params.diary
      this.state.color2 = diary.feelcolor
    }
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidMount() {
    const diary = this.props.navigation.state.params.diary
    this.props.writeDiaryInit(diary)
    this.props.navigation.setParams({
      handleSubmit: this._postDiary
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log('component will receive props')
    const {success} = nextProps
    if (success) {
      PubSub.publish('refreshDiaryList')
      dismissKeyboard()
      this.props.cleanWritePage()
      this.props.navigation.goBack()
    }
  }
  componentWillUpdate(nextProps, nextState) {
    console.log({nextProps, nextState})
    console.log('component will update')
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.props.cleanWritePage()
  }
  _keyboardDidShow = (e) => {
    console.log('did show', e)
    this.setState({
      screenHeight: screenHeight - 64 - e.startCoordinates.height
    });
  }
  _keyboardDidHide = (e) => {
    console.log('force update', e)
    this.setState({
      screenHeight: screenHeight - 64
    });
    // this.forceUpdate();
  }

  _postDiary = () => {
    const {ifprivate, materialPosition, imgBase64, content, postDiary, feel, navigation} = this.props
    const come4 = navigation.state.params.come4
    if (materialPosition >= 0) {
      console.log('post diary')
      console.log({content, img: materialPosition + '', ifprivate, feel, feelcolor: this.state.color2})
      const dataOne = this.props.diary === null ?
        {content, img: materialPosition + '', ifprivate, feel, feelcolor: this.state.color2} :
        {content, img: materialPosition + '', ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}
      postDiary(dataOne, come4)
    } else if (imgBase64 !== null) {
      const dataTwo = this.props.diary === null ?
        {content, img_byte: imgBase64, ifprivate, feel, feelcolor: this.state.color2} :
        {content, img_byte: imgBase64, ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}
      postDiary(dataTwo, come4)
    } else {
      const dataThree = this.props.diary === null ?
        {content, ifprivate, feel, feelcolor: this.state.color2} :
        {content, ifprivate, feel, feelcolor: this.state.color2, diary_id: this.props.diary.diary_id}
      postDiary(dataThree, come4)
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
    const that = this;
    ImagePicker.launchCamera(options, (response) => {
      that.setState({
        showModal: false
      })
      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        const imgBase64 = response.data
        this.props.photoPicker({source, imgBase64})
      }
    })
  }


  launchImageLibrary () {
    console.log('launchImageLib')
    const that = this;
    ImagePicker.launchImageLibrary(options, (response) => {
      that.setState({
        showModal: false
      })
      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        const imgBase64 = response.data
        this.props.photoPicker({source, imgBase64})
      }
    })
  }

  _onColorChanged = (color, feel) => {
    this.props.writeDiaryColorChange({color, feel})
    this.setState({
      color2: color
    })
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
        {Platform.OS === 'ios' && <View style={{height: this.state.screenHeight, backgroundColor: 'red'}}>
          <ScrollView style={styles.view} ref="scroll"
            onLayout={(event) => {
              this.setState({
                scrollHeight: event.nativeEvent.layout.height
              });
            }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              console.log(contentHeight, this.state.scrollHeight)
              if (contentHeight > this.state.scrollHeight) {
                this.refs.scroll.scrollToEnd({animated: false});
              }
            }}>
            <TouchableOpacity activeOpacity={1} style={{height: 60, width: theme.screenWidth}}>
              <View style={styles.time}>
                <Text style={[styles.day, {color: this.state.color2}]}>{this.props.day}</Text>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
                  <Text style={styles.week}>{this.props.date}</Text>
                  <Text style={styles.year_month}>{this.props.yymm}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{width: 100, height: 60, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.changeDiaryState}>
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
              placeholder="今天，你过得好么？"
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
              <Image source={this.props.source} style={{width: theme.screenWidth - 32, height: ((theme.screenWidth - 32) * 3) / 4}} resizeMode="stretch"/>
              <TouchableOpacity style={styles.deleteView} onPress={this.props.deletePhoto}>
                <Image style={{width: 23, height: 23}} source={DeletePhoto} resizeMode="contain"/>
              </TouchableOpacity>
              </View>}
          </ScrollView>
          <View style={{height: 40, alignSelf: 'flex-end'}}>
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
          </View>
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
                <TouchableOpacity activeOpacity={0.8} style={{width: 100, height: 60, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.changeDiaryState}>
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
              placeholder="今天，你过得好么？"
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
              <Image source={this.props.source} style={{width: theme.screenWidth - 32, height: ((theme.screenWidth - 32) * 3) / 4}} resizeMode="stretch"/>
              <TouchableOpacity style={styles.deleteView} onPress={this.props.deletePhoto}>
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
