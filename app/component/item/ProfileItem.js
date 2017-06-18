import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native'
import theme from '../../config/theme'
import * as consts from '../../utils/const'
import Rx from 'rxjs'
export default class ProfileItem extends Component {
  render () {
    const {value, navigation} = this.props
    return <TouchableOpacity onPress={this._router}>
      <View style={styles.item}>
        <Image style={styles.icon} resizeMode = 'contain' source={this._getSource(value)} ></Image>
        <Text style={styles.text}>{value}</Text>
      </View>
    </TouchableOpacity>
  }

  _getSource = (type) => {
    switch(type) {
      case consts.PROFILE_MINE_MESSAGE:
        return require('../../img/msg.png')
      case consts.PROFILE_MINE_FOLLOW:
        return require('../../img/follow.png')
      case consts.PROFILE_MINE_TRASH:
        return require('../../img/delete.png')
      case consts.PROFILE_RECOMMOND_F:
        return require('../../img/share.png')
      case consts.PROFILE_NOTIFICATION:
        return require('../../img/notice.png')
      case consts.PROFILE_FEEDBACK:
        return require('../../img/write.png')
      case consts.PROFILE_ABOUT_US:
        return require('../../img/me.png')
      default:
        return require('../../img/comment_share.png')
    }
  }

  _router =  () => {
    const that = this
    const {value, navigation} = this.props
    switch(value) {
      case consts.PROFILE_MINE_MESSAGE:
        that._routerMineMessage()
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
        alert(consts.PROFILE_ABOUT_US)
        break;
    }
  }

  _routerMineMessage =  () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        alert('my message')
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
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('FeedbackPage', {come4: 'profile'})   
      } else {
        this.props.navigation.navigate('FeedbackPage', {come4: 'profile'})
      }
    })
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

