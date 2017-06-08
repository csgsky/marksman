import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

export default class CommentItem extends Component {
  render () {
    return <View style={styles.commentView}>
      <View style={styles.singleView}>
        <View style={{flexDirection: 'row'}}>
          <Image resizeMode ='contain' style={styles.img} source={require('../img/conment_vote.png')} />
          <Text style={styles.text}>99</Text>
        </View>
      </View>
      <View style={styles.singleView}>
        <View style={{flexDirection: 'row'}}>
          <Image resizeMode ='contain' style={styles.img} source={require('../img/comment.png')} />
          <Text style={styles.text}>88</Text>
        </View>
      </View>
      <View style={styles.singleView}>
        <View style={{flexDirection: 'row'}}>
          <Image resizeMode ='contain' style={styles.img} source={require('../img/comment_share.png')} />
        </View>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  commentView: {
    flexDirection: 'row',
    height: 48
  },
  singleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 15,
    height: 15,
    marginTop: 4
  },
  text: {
    color: '#9b9b9b',
    fontSize: 16,
    marginLeft: 5
  }
})
