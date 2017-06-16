import React, {Component} from 'react'
import theme from '../../config/theme'
import CommentIcon from '../../img/comment.png'
import LikeIcon from '../../img/like.png'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

export default class CommentItem extends Component {
  render () {
    const {data} = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.3}>
        <View style={styles.item}>
          <View style={styles.header}>
            <Image source={data.avtar ? {uri: data.avtar} : theme.imgs.DefaultUserAvatar} style={styles.img}/>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{data.nickname}</Text>
              <Text style={styles.time}>{data.create_time}</Text>
            </View>
            <Image source={CommentIcon} style={styles.comment} resizeMode="contain"/>
            <Image source={LikeIcon} style={styles.like} resizeMode="contain"/>
            <Text style={styles.count}>{data.like.num}</Text>
          </View>
          <Text style={styles.content}>{data.content}</Text>
          {data.recomments && data.recomments.length > 0  && <View style={styles.comments}>
            <Text style={styles.link}>{data.recomments[0].nickname}</Text>
            <Text style={styles.subText}>等人 </Text>
            <Text style={styles.link}>共{data.recomments.length}条回复 </Text>
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
    marginBottom: 11
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
