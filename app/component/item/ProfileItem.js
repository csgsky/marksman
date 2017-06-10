import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'
import * as consts from '../../utils/const'

export default class ProfileItem extends Component {
  render () {
    const {value} = this.props
    console.warn('ProfileItem ==> value ==> ' + value)
    return <TouchableOpacity>
      <View style={styles.item}>
        <Image style={styles.icon} source={this._getSource(value)} ></Image>
        <Text style={styles.text}>{value}</Text>
      </View>
    </TouchableOpacity>
  }

  _getSource = (type) => {
    switch(type) {
      case consts.PROFILE_MINE_MESSAGE:
        return require('../../img/conment_vote.png')
      case consts.PROFILE_MINE_FOLLOW:
        return require('../../img/comment_share.png')
      case consts.PROFILE_MINE_TRASH:
        return require('../../img/conment_vote.png')
      case consts.PROFILE_RECOMMOND_F:
        return require('../../img/comment_share.png')
      case consts.PROFILE_NOTIFICATION:
        return require('../../img/conment_vote.png')
      case consts.PROFILE_FEEDBACK:
        return require('../../img/comment_share.png')
      case consts.PROFILE_ABOUT_US:
        return require('../../img/conment_vote.png')
      default:
        return require('../../img/comment_share.png')
    }
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

