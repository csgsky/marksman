import React, {PureComponent} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import ImagePicker from 'react-native-image-picker'
import theme from '../config/theme'
import DefaultImg from '../img/reply_photo_placeholder.png'
import Close from '../img/photo_delete.png'
import * as actions from '../actions/commentEditorAction'
import PhotoPickerModal from '../widget/PhotoPickerModal'


const dismissKeyboard = require('dismissKeyboard')

const options = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
  allowsEditing: true
}
class CommentEditor extends PureComponent {

  static navigationOptions = ({navigation}) => ({
    title: '发评论',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleSubmit()}><Text style={[styles.submit, {color: (navigation.state.params.content) ? '#c37f2e' : '#A4A3A5'}]}>发送</Text></TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      image: undefined,
      data: undefined,
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
    const {nickname, type} = this.props.navigation.state.params;
    this.setState({
      nickname,
      type
    })
  }

  componentDidMount() {
    const that = this;
    const {diaryId, ownerId, commentId, pid} = this.props.navigation.state.params;
    this.props.navigation.setParams({
      handleSubmit: () => {
        const {isLoading} = that.props;
        if (isLoading) {
          return;
        }
        const data = {
          content: that.state.text,
          img_byte: that.state.data,
          img_suffix: that.state.suffix
        }
        if (pid) {
          data.pid = pid
        }
        if (that.state.text) {
          that.props.commentPost({diaryId, ownerId, commentId, data})
        }
      }
    })
    PubSub.subscribe('refreshDetailPage', () => this.props.navigation.goBack())
  }

  // componentWillReceiveProps(nextProps) {
  //   const {success} = this.props
  //   const newSuccess = nextProps.success
  //   console.log({success, newSuccess})
  //   if (success !== newSuccess && newSuccess === true) {
  //     this.props.navigation.goBack()
  //   }
  // }

  componentWillUnmount() {
    this.props.clearCommentPost()
  }
  _closeKeyBoard = () => {
    dismissKeyboard()
  }

  launchCamera () {
    const that = this;
    ImagePicker.launchCamera(options, (response) => {
      that.setState({
        showModal: false
      })
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const source = { uri: 'data:image/jpg;base64,' + response.data };
        this.setState({
          image: source,
          data: response.data,
          suffix: 'JPEG'
          //suffix: response.fileName.split('.')[1]
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
    const placeholder = this.state.type === 'topic' ? '回复话题' : `回复楼主：@${this.state.nickname}`;
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
          onChangeText={(text) => {
            this.setState({text});
            this.props.navigation.setParams({content: text})
          }}
          value={this.state.text}
          placeholderTextColor="#a3a3a3"
          underlineColorAndroid="transparent"
          placeholder={placeholder}/>
        <TouchableOpacity onPress={() => this.showDialog()} style={{flexDirection: 'row'}}>
          <Image source={this.state.image || DefaultImg} style={{width: 70, height: 70, marginLeft: 16}}/>
          {this.state.image && <TouchableOpacity style={styles.delete} onPress={() => { this.setState({image: undefined}) }}>
            <Image source={Close} style={{width: 16, height: 16}} resizeMode="contain"/>
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
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
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
  delete: {
    position: 'absolute',
    left: 70,
    top: 0,
    width: 16,
    height: 16
  }
})

export default connect(({commentEditor}) => commentEditor, dispatch => bindActionCreators(actions, dispatch))(CommentEditor);
