import React, {Component} from 'react'
import Rx from 'rxjs'
import {StyleSheet, View, Text, Image, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import PubSub from 'pubsub-js'
import Toast from 'react-native-root-toast'
import ImagePicker from 'react-native-image-picker'
import * as actions from '../../actions/profile'
import theme from '../../config/theme'
import Separator from '../../component/Separator'
import ProfileItem from '../../component/item/ProfileItem'
import * as consts from '../../utils/const'
import DefaultUserAvatar from '../../img/default_vatar.png'
import PhotoPickerModal from '../../widget/PhotoPickerModal'

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
class PersonalCenter extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '个人中心',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      avatar: null,
      messageReminder: true,
      systemReminder: true,
      showPhotoPickerModal: false
    }
  }

  componentDidMount () {
    this.initData()
    this.props.submitInitPage()
    const that = this
    PubSub.subscribe('refresh', (come, data) => {
      Rx.Observable.of('refresh')
                      .delay(800)
                      .subscribe((it) => {
                        that.initData()
                      })
    })
  }

  componentWillReceiveProps (nextProps) {
    const {success} = nextProps
    const oldSuccess = this.props.success
    if (oldSuccess !== success && success) {
      Toast.show('更新成功', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
        // calls on toast\`s appear animation start
        },
        onShown: () => {
        // calls on toast\`s appear animation end.
        },
        onHide: () => {
        // calls on toast\`s hide animation start.
        },
        onHidden: () => {
        // calls on toast\`s hide animation end.
        }
      })
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe('refresh')
  }


  getSource = () => {
    if (this.props.info.avtar === null || this.props.info.avtar === '') {
      console.warn('image empty')
      return DefaultUserAvatar
    } else {
      console.warn('image not empty')
      return this.state.avatar || {uri: this.props.info.avtar}
    }
  }

  initData() {
    AsyncStorage.getItem('userId').then((result) => {
      this.props.personalInfoInit(result)
    })
  }

  hideDialog() {
    this.setState({
      showPhotoPickerModal: false
    })
  }

  launchCamera () {
    ImagePicker.launchCamera(options, (response) => {
      this.setState({
        showPhotoPickerModal: false
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
          avatar: source
        });
        Rx.Observable.of('refresh')
                      .delay(100)
                      .subscribe((it) => {
                        this.props.submitUserInfo({avtar_byte: response.data, avtar_suffix: 'png'}, this.props.info)
                      })
      }
    })
  }


  launchImageLibrary () {
    ImagePicker.launchImageLibrary(options, (response) => {
      this.setState({
        showPhotoPickerModal: false
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
          avatar: source
        });
        Rx.Observable.of('refresh')
                      .delay(100)
                      .subscribe((it) => {
                        this.props.submitUserInfo({avtar_byte: response.data, avtar_suffix: 'png'}, this.props.info)
                      })
      }
    })
  }

  _clearUserInfo = async () => {
    await AsyncStorage.removeItem('userId')
  }

  _loginOut = () => {
    this._clearUserInfo()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login', come4: 'signOut'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  _routerProfilePage = () => {
    const {info} = this.props
    if (info.user_id !== null) {
      this.props.navigation.navigate('EditProfilePage', {come4: 'profile', info})
    } else {
      this.props.navigation.navigate('Login', {come4: 'profile'})
    }
  }

  render () {
    const {navigation} = this.props
    console.warn('this.props.info ==> ', this.props.info)
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <PhotoPickerModal
          _dialogVisible={this.state.showPhotoPickerModal}
          hide={() => this.hideDialog()}
          launchCamera={() => this.launchCamera()}
          launchImageLibrary={() => this.launchImageLibrary()}
          />
        <Separator />
        <View style={styles.view}>
          <TouchableOpacity style={styles.profile} onPress={this._routerProfilePage}>
            <TouchableOpacity onPress={() => this.setState({showPhotoPickerModal: true})}>
              <Image style={styles.avatar} source={this.getSource()}/>
            </TouchableOpacity>
            <View style={styles.desc}>
              <View style={styles.nicknameView}>
                <Text style={styles.nickname}>{this.props.info && this.props.info.nickname}</Text>
              </View>
              <View style={styles.signatureView}>
                <Text style={styles.signature}>{this.props.info && this.props.info.sign}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <ProfileItem navigation={navigation} reminder={this.state.messageReminder} value={consts.PROFILE_MINE_MESSAGE}/>
          <ProfileItem navigation={navigation} value={consts.PROFILE_MINE_FOLLOW}/>
          <ProfileItem navigation={navigation} value={consts.PROFILE_MINE_TRASH}/>
          <View style={{height: 20}}/>
          <ProfileItem navigation={navigation} value={consts.PROFILE_RECOMMOND_F}/>
          <ProfileItem navigation={navigation} reminder={this.state.systemReminder} value={consts.PROFILE_NOTIFICATION}/>
          <ProfileItem navigation={navigation} value={consts.PROFILE_FEEDBACK}/>
          <ProfileItem navigation={navigation} value={consts.PROFILE_ABOUT_US}/>
          {this.props.navigation.state.params.isLogin && <TouchableOpacity style={styles.loginOut} onPress={this._loginOut}>
            <Text style={{fontSize: theme.text.xxlgFontSize, color: 'white'}}>退出账号</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white'
  },
  profile: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 24
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  desc: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'column'
  },
  nicknameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  signatureView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nickname: {
    color: theme.text.globalTextColor,
    fontSize: 18,
  },
  signature: {
    color: theme.text.globalSubTextColor,
    fontSize: 15,
  },
  loginOut: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#f4b66c',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({profile}) => profile

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter)
