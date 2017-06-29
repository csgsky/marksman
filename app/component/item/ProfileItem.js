import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native'
import { NavigationActions } from 'react-navigation'
import theme from '../../config/theme'
import * as consts from '../../utils/const'
import Msg from '../../img/msg.png'
import Follow from '../../img/follow.png'
import Delete from '../../img/delete.png'
import Share from '../../img/share.png'
import Notice from '../../img/notice.png'
import Write from '../../img/write.png'
import Me from '../../img/me.png'

export default class ProfileItem extends Component {

  _getSource = (type) => {
    switch (type) {
      case consts.PROFILE_MINE_MESSAGE:
        return Msg
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

  _router =  () => {
    const that = this
    const {value, navigation} = this.props
    switch(value) {
      case consts.PROFILE_MINE_MESSAGE:
        that._routerMineNews()
        break;
      case consts.PROFILE_MINE_FOLLOW:
        that._routerMineFollow()
        break;
      case consts.PROFILE_MINE_TRASH:
        that._routerMineTrash()
        break;
      case consts.PROFILE_RECOMMOND_F:
        alert(consts.PROFILE_RECOMMOND_F)
        break;
      case consts.PROFILE_NOTIFICATION:
        alert(consts.PROFILE_NOTIFICATION)
        break;
      case consts.PROFILE_FEEDBACK:
        that._routerFeedback()
        break;
      case consts.PROFILE_ABOUT_US:
        this._routerAboutUs()
        break;
    }
  }

  _routerMineNews = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('NewsCenterPage', {come4: 'profile'})
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
    fontSize: 18,
    marginLeft: 18,
    color: theme.text.globalTextColor
  }
})

