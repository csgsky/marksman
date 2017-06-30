import React, {PureComponent} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import theme from '../config/theme'
import DefaultImg from '../img/default_vatar.png'
import Close from '../img/close.png'
import * as actions from '../actions/commentEditorAction'
import PhotoPickerModal from '../widget/PhotoPickerModal'

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
class CommentEditor extends PureComponent {

  static navigationOptions = ({navigation}) => ({
    title: '发评论',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleSubmit()}><Text style={styles.submit}>发送</Text></TouchableOpacity>,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      image: undefined,
      data: undefined,
      suffix: undefined,
      nickname: '',
      showModal: false
    }
  }

  // chooseImge = () => {
  //   if (this.state.image) {
  //     return
  //   }
  //   const options = {
  //     title: '选择图片',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images'
  //     }
  //   }
  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const source = { uri: 'data:image/jpg;base64,' + response.data };

  //       this.setState({
  //         image: source,
  //         data: response.data,
  //         suffix: response.fileName.split('.')[1]
  //       });
  //     }
  //   });
  // }
  componentWillMount() {
    const {nickname} = this.props.navigation.state.params;
    this.setState({
      nickname
    })
  }

  componentDidMount() {
    const that = this;
    const {diaryId, ownerId, commentId, pid} = this.props.navigation.state.params;
    this.props.navigation.setParams({
      handleSubmit: () => {
        const data = {
          content: that.state.text,
          img_byte: that.state.data,
          img_suffix: that.state.suffix,
        }
        if (pid) {
          data.pid = pid
        }
        console.log({data})
        if (that.state.text) {
          that.props.commentPost({diaryId, ownerId, commentId, data})
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const {success} = this.props
    const newSuccess = nextProps.success
    console.log({success, newSuccess})
    if (success !== newSuccess && newSuccess === true) {
      this.props.navigation.goBack()
    }
  }

  componentWillUnmount() {
    this.props.clearCommentPost()
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
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: 'data:image/jpg;base64,' + response.data };

        this.setState({
          image: source,
          data: response.data,
          suffix: response.fileName.split('.')[1]
        });
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
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: 'data:image/jpg;base64,' + response.data };
        this.setState({
          image: source,
          data: response.data,
          suffix: response.fileName.split('.')[1]
        });
      }
    })
  }

  _onColorChanged = (color, feel) => {
    this.props.writeDiaryColorChange({color, feel})
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
  render() {
    return (
      <View style={styles.container}>
        <PhotoPickerModal
          _dialogVisible={this.state.showModal}
          hide={() => this.hideDialog()}
          launchCamera={() => this.launchCamera()}
          launchImageLibrary={() => this.launchImageLibrary()}
          />
        <TextInput
          style={styles.input}
          multiline
          autoFocus
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholderTextColor="#a3a3a3"
          underlineColorAndroid="transparent"
          placeholder={`回复楼主：@${this.state.nickname}`}/>
        <TouchableOpacity onPress={() => this.showDialog()} style={{flexDirection: 'row'}}>
          <Image source={this.state.image || DefaultImg} style={{width: 70, height: 70, marginLeft: 20}}/>
          {this.state.image && <TouchableOpacity onPress={() => { this.setState({image: undefined}) }}>
            <Image source={Close} style={{width: 17, height: 17, marginLeft: -17}}/>
          </TouchableOpacity>}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  input: {
    height: 218,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    color: '#a3a3a3',
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22
  },
  submit: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: theme.text.xxlgFontSize
  },
})

export default connect(({commentEditor}) => commentEditor, dispatch => bindActionCreators(actions, dispatch))(CommentEditor);
