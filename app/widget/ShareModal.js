import React, { Component } from 'react'
import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    StatusBar
} from 'react-native'
import * as WeChat from 'react-native-wechat'
import * as QQAPI from 'react-native-qq';
import Toast from 'react-native-root-toast'
import theme from '../config/theme'
import wechatF from '../img/share_wechat_f.png'
import wechatM from '../img/share_wechat_m.png'
import qqF from '../img/share_qq_f.png'
import qqZ from '../img/share_qq_z.png'

export default class ShareModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      wechatMetadata: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wechatMetadata: nextProps.wechatMetadata
    })
  }

  shareWeChatF = () => {
    this.props.hideShare()
    if (WeChat.isWXAppInstalled) {
      WeChat.shareToSession(this.state.wechatMetadata)
    } else {
      Toast.show('未安装微信客户端', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    }
  }

  shreWeChatM = () => {
    this.props.hideShare()
    if (WeChat.isWXAppInstalled) {
      WeChat.shareToTimeline(this.state.wechatMetadata)
    } else {
      Toast.show('未安装微信客户端', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    }
  }

  shareToQQF = () => {
    this.props.hideShare()
    if (QQAPI.isQQInstalled) {
      QQAPI.shareToQQ(this.state.wechatMetadata).then((result) => {
        if (result) {
          Toast.show('分享成功', {
            duration: Toast.durations.shor,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true
          })
        }
      })
    } else {
      Toast.show('未安装QQ客户端', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    }
  }

  shareToQQZ = () => {
    this.props.hideShare()
    if (QQAPI.isQQInstalled) {
      QQAPI.shareToQzone(this.state.wechatMetadata).then((result) => {
        if (result) {
          Toast.show('分享成功', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          })
        }
      })
    } else {
      Toast.show('未安装QQ客户端', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    }
  }

  render () {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'fade'}
        transparent>
        <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={this.props.hideShare}>
          <TouchableOpacity activeOpacity={1} style={styles.dialog}>
            <View style={{flexDirection: 'row', height: 48, backgroundColor: 'white'}}>
              <View style={{width: 1.5, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15, marginLeft: 16 }} />
              <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: theme.text.globalSubTextColor}}>分享至</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
              <TouchableOpacity activeOpacity={0.8} style={styles.shareItem} onPress={this.shareWeChatF}>
                <Image source={wechatF} style={styles.shareItemImg} resizeMode="contain"/>
                <Text style={styles.shareItemText}>微信</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.shareItem} onPress={this.shreWeChatM}>
                <Image source={wechatM} style={styles.shareItemImg} resizeMode="contain"/>
                <Text style={styles.shareItemText}>朋友圈</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.shareItem} onPress={this.shareToQQF}>
                <Image source={qqF} style={styles.shareItemImg} resizeMode="contain"/>
                <Text style={styles.shareItemText}>QQ</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.shareItem} onPress={this.shareToQQZ}>
                <Image source={qqZ} style={styles.shareItemImg} resizeMode="contain"/>
                <Text style={styles.shareItemText}>QQ空间</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.cancelItem} onPress={this.props.hideShare}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>取消</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  bg: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    flexDirection: 'column',
    backgroundColor: 'rgba(52,52,52,0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dialog: {
    width: theme.screenWidth,
    marginBottom: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight,
  },
  shareItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 22
  },
  shareItemImg: {
    height: 22,
    width: 22
  },
  shareItemText: {
    color: theme.text.globalSubTextColor,
    fontSize: theme.text.mdFontSize,
    marginTop: 5
  },
  cancelItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    backgroundColor: 'white'
  }
})
