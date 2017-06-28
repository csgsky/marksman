import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import theme from '../config/theme'
import Like from '../img/like.png'
import Liked from '../img/liked.png'
import Comment from '../img/comment.png'
import Share from '../img/comment_share.png'

class CommentBar extends Component {
  render() {
    const {myLike, likeAction, commentAction, shareAction, likeNum, commentsNum} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => likeAction && likeAction()} style={{flex: 1}}>
          <View style={styles.cell}>
            <Image source={myLike ? Liked : Like} style={{width: 17, height: 17}}/>
            <Text style={{color: theme.text.globalSubTextColor, marginLeft: 8, fontSize: 13}}>{likeNum}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => commentAction && commentAction()} style={{flex: 1}}>
          <View style={styles.cell}>
            <Image source={Comment} style={{width: 18, height: 17}}/>
            <Text style={{color: theme.text.globalSubTextColor, marginLeft: 8, fontSize: 13}}>{commentsNum}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareAction && shareAction()} style={{flex: 1}}>
          <View style={styles.cell}>
            <Image source={Share} style={{width: 17, height: 17}}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 44,
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default CommentBar
