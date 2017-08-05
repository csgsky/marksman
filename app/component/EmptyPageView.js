import React, {Component} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import MsgEmpty from '../img/msg_empty.png'
import DiaryEmpty from '../img/diary_empty.png'
import TrashEmpty from '../img/trash_empty.png'

import theme from '../config/theme'

export default class EmptyView extends Component {

  getEmptyImage = () => {
    const {come4} = this.props
    if (come4 === 'diary') {
      return DiaryEmpty
    } else if (come4 === 'msg') {
      return MsgEmpty
    } else if (come4 === 'trash') {
      return TrashEmpty
    }
    return DiaryEmpty
  }

  render () {
    const {message} = this.props
    return (
      <View style={styles.view}>
        <View style={styles.emptyView}>
          <Image style={styles.emptyImg} resizeMode="contain" source={this.getEmptyImage()} />
          <Text style={styles.emptyText}>{message}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: theme.screenWidth,
    height: theme.screenHeight - 120,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    flexDirection: 'column'
  },
  emptyImg: {
    width: 150,
    height: 75,
    alignSelf: 'center'
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#f89f33',
    alignSelf: 'center'
  }
})
