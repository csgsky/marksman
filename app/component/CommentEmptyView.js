import React, {Component} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import CommentEmpty from '../img/comment_empty.png'

export default class CommentEmptyView extends Component {

  render () {
    const {message} = this.props
    return (
      <View style={styles.view}>
        <View style={styles.emptyView}>
          <Image style={styles.emptyImg} resizeMode="contain" source={CommentEmpty} />
          <Text style={styles.emptyText}>{message}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  emptyView: {
    flexDirection: 'column'
  },
  emptyImg: {
    width: 80,
    height: 90,
    alignSelf: 'center'
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#f89f33',
    alignSelf: 'center'
  }
})
