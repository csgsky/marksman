import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, AsyncStorage, StyleSheet, NativeModules} from 'react-native'
import theme from '../../config/theme'
import * as consts from '../../utils/const'
import Follow from '../../img/follow.png'
import Delete from '../../img/delete.png'
import Share from '../../img/share.png'
import Notice from '../../img/notice.png'
import Write from '../../img/write.png'
import Me from '../../img/me.png'
import Reminder from '../../component/Reminder'
import Next from '../../img/next.png'
import HomePage from '../../img/homepage.png'


export default class ProfileItem extends Component {

  _getSource = (type) => {
    switch (type) {
      case consts.PROFILE_MINE_HOME_PAGE:
        return HomePage
      case consts.PROFILE_MINE_FOLLOW:
        return Follow
      case consts.PROFILE_MINE_TRASH:
        return Delete
      case consts.PROFILE_RECOMMOND_F:
        return Share
      case consts.PROFILE_NOTIFICATION:
        return Notice
      case consts.PROFILE_FEEDBACK:
        return Write
      case consts.PROFILE_ABOUT_US:
        return Me
      default:
        return Write
    }
  }

  _router = () => {
    const that = this
    const {value} = this.props
    switch (value) {
      case consts.PROFILE_MINE_HOME_PAGE:
        NativeModules.TCAgent.track('我的', '我的主页')
        that._routerPersonalPage()
        break;
      case consts.PROFILE_MINE_FOLLOW:
        NativeModules.TCAgent.track('我的', '我的关注')
        that._routerMineFollow()
        break;
      case consts.PROFILE_MINE_TRASH:
        NativeModules.TCAgent.track('我的', '垃圾箱')
        that._routerMineTrash()
        break;
      case consts.PROFILE_RECOMMOND_F:
        NativeModules.TCAgent.track('我的', '推荐给朋友')
        this.props.showShare()
        break;
      case consts.PROFILE_NOTIFICATION:
        this._routerSystemMessage(consts.PROFILE_NOTIFICATION)
        NativeModules.TCAgent.track('我的', '系统通知')
        break;
      case consts.PROFILE_FEEDBACK:
        NativeModules.TCAgent.track('我的', '反馈问题')
        that._routerFeedback()
        break;
      case consts.PROFILE_ABOUT_US:
        NativeModules.TCAgent.track('我的', '关于我们')
        this._routerAboutUs()
        break;
      default:
        this._routerAboutUs()
    }
  }

  _routerPersonalPage = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('PersonalPage', {message: '个人中心', id: result})
      }
    })
  }

  _routerMineFollow = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('MyFollowPage', {come4: 'profile'})
      }
    })
  }

  _routerMineTrash = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('TrashPage', {come4: 'profile'})
      }
    })
  }

  _routerSystemMessage = (value) => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else if (this.props.profileItemClick) {
        this.props.profileItemClick(value)
        this.props.navigation.navigate('SystemMessagePage', {come4: 'profile'})
      }
    })
  }

  _routerFeedback = () => {
    this.props.navigation.navigate('FeedbackPage', {come4: 'profile'})
  }

  _routerAboutUs = () => {
    this.props.navigation.navigate('AboutUsPage')
  }
  render () {
    const {value} = this.props
    return (<TouchableOpacity onPress={this._router}>
      <View style={styles.item}>
        <Image style={styles.icon} resizeMode="contain" source={this._getSource(value)} />
        <Text style={styles.text}>{value}</Text>
        {this.props.reminder && <Reminder />}
        <Image style={styles.next} source={Next} />
      </View>
    </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50
  },
  icon: {
    width: 18,
    height: 18
  },
  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 18,
    color: theme.text.globalTextColor
  },
  next: {
    width: 8,
    height: 14,
    marginLeft: 14,
  }
})
