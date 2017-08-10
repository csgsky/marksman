import React, {Component} from 'react'
import {StyleSheet, View, WebView, TouchableOpacity, Image, Platform, NativeModules} from 'react-native'
import theme from '../../config/theme'
import Protocol from '../../constant/agreement.html'
import Share from '../../img/toolbar_share.png'
import ShareModal from '../../widget/ShareModal'

export default class CommonWebviewPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
    headerStyle: {elevation: 1, backgroundColor: '#fff'},
    headerRight: navigation.state.params.type === 'protocol' ? <View /> : (<TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.state.params.share()}>
      <Image resizeMode="contain" style={{width: 22, height: 22, marginRight: 16}} source={Share} /></TouchableOpacity>),
    gesturesEnabled: false,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      shareVisible: false, // 显示分享
      wechatMetadata: null
    }
  }


  componentWillMount() {
    if (Platform.OS === 'android') {
      NativeModules.SplashScreen.hideSystemNavigationBar()
    }
  }
  componentDidMount() {
    const {state} = this.props.navigation
    if (state.params.type !== 'protocol') {
      this.props.navigation.setParams({
        share: this.showShare
      })
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      NativeModules.SplashScreen.showSystemNavigationBar()
    }
  }

  getWechatShareMeta = () => {
    const {state} = this.props.navigation
    return {
      type: 'news',
      webpageUrl: state.params.url,
      title: state.params.name,
      description: state.params.desc,
      thumbImage: state.params.shareImage
    }
  }
  hideShare = () => {
    this.setState({
      shareVisible: false
    })
    if (Platform.OS === 'android') {
      NativeModules.SplashScreen.hideSystemNavigationBar()
    }
  }

  showShare = () => {
    // 分享数据
    const wechatMetadata = this.getWechatShareMeta()
    this.setState({
      shareVisible: true,
      wechatMetadata
    })

  }

  render () {
    const {state} = this.props.navigation
    if (state.params.type === 'protocol') {
      const source = Platform.OS === 'ios' ? Protocol : { uri: 'file:///android_asset/agreement.html' };
      return <WebView style={styles.container} source={source}/>
    }
    return (<View style={{flex: 1}}>
      <ShareModal
        visible={this.state.shareVisible}
        hideShare={this.hideShare}
        wechatMetadata={this.state.wechatMetadata}
      />
      <WebView style={styles.container} source={{uri: state.params.url}}/>
    </View>)
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenHeight
  }
})
