import React, {Component} from 'react'
import theme from '../../config/theme'
import CommentIcon from '../../img/comment.png'
import LikeIcon from '../../img/like.png'
import LikedIcon from '../../img/liked.png'
import {View, Text, Image, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native'
import {recentTime} from '../../utils/TimeUtils';

export default class CommentItem extends Component {
  _onPressUserAvatar = () => {
    const userId = this.props.data.user_id;
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('PersonalPage', {me: true, message: '评论', id: userId})
      } else {
        if (result == userId) {
          this.props.navigation.navigate('PersonalPage', {me: true, message: '评论', id: userId})
          return
        }
        this.props.navigation.navigate('PersonalPage', {me: false, message: '评论', id: userId})
      }
    })
  }
  photoView = () => {
    const {navigation, data} = this.props
    navigation.navigate('LightBoxPage', {img: data.img})
  }
  getIndexText = () => {
    const {index, type} = this.props;
    if (type === 'commentsList' && index === 0) {
      return '楼主'
    }
    if (type === 'commentsList') {
      return `${index}楼`
    }
    return `${index + 1}楼`
  }
  render () {
    const {data, index, type, onPressCommentItem, onPressLike, isLikingComment} = this.props
    return (
      <TouchableOpacity style={{backgroundColor: 'white'}}
        onPress={onPressCommentItem}
        activeOpacity={0.3}>
        <View style={styles.item}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this._onPressUserAvatar}>
              <Image source={data.avtar ? {uri: data.avtar} : theme.imgs.DefaultUserAvatar} style={styles.img}/>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{data.nickname}</Text>
              <Text style={styles.time}>{this.getIndexText()} {recentTime(data.create_time)}</Text>
            </View>
            <Image source={CommentIcon} style={styles.comment} resizeMode="contain"/>
            {!(type === 'commentsList' && index !== 0) && <TouchableOpacity style={{flexDirection: 'row'}}
              onPress={() => {
                if (isLikingComment) {
                  return
                }
                onPressLike({diaryId: data.diary_id, ownerId: data.owner_id, commentId: data.comment_id, index, myLike: data.my_like})
              }}>
              <Image source={data.my_like ? LikedIcon : LikeIcon} style={styles.like} resizeMode="contain"/>
              <Text style={likeStyle(data.my_like)}>{data.like ? data.like.num : 0}</Text>
            </TouchableOpacity>}
          </View>
          <Text style={styles.content}>
            {type === 'commentsList' && index !== 0 && '回复'}
            {type === 'commentsList' && index !== 0 && <Text style={styles.recvName}>@{data.recv_name}：</Text>}
            {data.content}
          </Text>
          {!!data.simg && <TouchableOpacity style={{width: 110, height: 110}} onPress={this.photoView}>
            <Image source={{uri: data.simg}} style={{width: 110, height: 110, marginBottom: 20}}/>
          </TouchableOpacity>}
          {type !== 'commentsList' && !!data.recomments && data.recomments.length > 0 && <View style={styles.comments}>
            <Text style={styles.link}>{data.recomments[0].nickname}</Text>
            <Text style={styles.subText}>等人 </Text>
            <Text style={styles.link}>共{data.count}条回复>> </Text>
          </View>}
        </View>
      </TouchableOpacity>
    )
  }

  // _onPress = (topicId, ownerId) => {
  //   this.props.navigation.navigate('TopicPage', {topicId, ownerId})
  // }

  // getSource = (img) => {
  //   return {uri: img}
  // } 
}

const likeStyle = function(liked) {
  return {
    fontSize: theme.text.xlgFontSize,
    color: liked ? theme.likedColor : theme.text.globalSubTextColor,
    height: 15
  }
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 15,
    paddingBottom: 4,
    paddingLeft: 15,
    paddingRight: 15
  },
  header: {
    flexDirection: 'row'
  },
  infoContainer: {
    flex: 1,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  },
  content: {
    fontSize: theme.text.xlgFontSize,
    color: theme.text.globalTextColor,
    marginTop: 13,
    marginBottom: 11,
    lineHeight: 22,
    flexDirection: 'row'
  },
  recvName: {
    color: theme.linkColor
  },
  name: {
    fontSize: theme.text.xlgFontSize,
    color: '#f89f33'
  },
  time: {
    fontSize: theme.text.smFontSize,
    color: theme.text.globalSubTextColor,
    marginTop: 9
  },
  comment: {
    width: 15,
    height: 15,
    marginRight: 15
  },
  like: {
    width: 15,
    height: 15,
    marginRight: 6
  },
  count: {
    fontSize: theme.text.xlgFontSize,
    color: theme.text.globalSubTextColor,
    height: 15
  },
  comments: {
    flexDirection: 'row',
    width: 300,
    backgroundColor: theme.pageBackgroundColor,
    padding: 12,
    marginBottom: 8,
  },
  subText: {
    color: theme.text.globalSubTextColor,
    fontSize: theme.text.mdFontSize
  },
  link: {
    color: theme.linkColor,
    fontSize: theme.text.mdFontSize
  }
})
