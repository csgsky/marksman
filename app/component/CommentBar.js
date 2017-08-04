import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import theme from '../config/theme'
import Like from '../img/like.png'
import Liked from '../img/liked.png'
import Comment from '../img/comment.png'
import Share from '../img/comment_share.png'
import Separator from '../component/Separator'

class CommentBar extends Component {
  render() {
    const {myLike, likeAction, commentAction, showShare, likeNum, commentsNum} = this.props;
    return (
      <View>
        {!this.props.diary && <Separator />}
        <View style={styles.container}>
          <TouchableOpacity onPress={() => likeAction && likeAction()} style={{flex: 1}}>
            <View style={styles.cell}>
              <Image resizeMode="stretch" source={myLike ? Liked : Like} style={{width: 16, height: 16}}/>
              <Text style={{color: theme.text.globalSubTextColor, marginLeft: 8, fontSize: 13}}>{likeNum}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => commentAction && commentAction()} style={{flex: 1}}>
            <View style={styles.cell}>
              <Image resizeMode="stretch" source={Comment} style={{width: 16, height: 16}}/>
              <Text style={{color: theme.text.globalSubTextColor, marginLeft: 8, fontSize: 13}}>{commentsNum}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showShare} style={{flex: 1}}>
            <View style={styles.cell}>
              <Image resizeMode="stretch" source={Share} style={{width: 16, height: 16}}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 44,
    backgroundColor: 'white',
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
