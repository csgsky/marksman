import React, {PureComponent} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import theme from '../config/theme'
import DefaultImg from '../img/default_vatar.png'
import Close from '../img/close.png'
import * as actions from '../actions/commentEditorAction'

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
      suffix: undefined
    }
  }

  chooseImge = () => {
    if (this.state.image) {
      return
    }
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        const source = { uri: 'data:image/jpg;base64,' + response.data };

        this.setState({
          image: source,
          data: response.data,
          suffix: response.fileName.split('.')[1]
        });
      }
    });
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          autoFocus
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholderTextColor="#a3a3a3"
          underlineColorAndroid="transparent"
          placeholder="回复楼主：@倾城与"/>
        <TouchableOpacity onPress={() => this.chooseImge()} style={{flexDirection: 'row'}}>
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
