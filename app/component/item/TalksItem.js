import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'

export default class TalksItem extends Component {
  render () {
    const {item, index, navigation, type} = this.props
    let cover = item.icon_url
    let name = item.name
    let tag = item.tag
    let comment = `${item.views}浏览 | ${item.comment.num}评论 ` 
    return <TouchableOpacity style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16, paddingTop: index === 0 ? 16 : 0}}
      activeOpacity = {0.3}
      onPress={() => this._onPress(item.talk_id, item.user_id)}>
      <View style={styles.item}>
        <Image style={styles.img} source={require('../../img/splash.jpg')}></Image>
        <View style={{flex: 1, flexDirection: 'column', paddingLeft: 9}}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingBottom: 6}}>
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
          </View>
          {type !== 'followed' && <View style={{flex: 1, flexDirection: 'row', paddingTop: 6}}>
            <Text style={styles.tag}>{tag}</Text>
            <Text style={styles.comment}>{comment}</Text>
          </View>}
          {type === 'followed' && <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.comment}>{comment}</Text>
              <Text style={styles.tag}>{tag}</Text>
            </View>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this._onPressFollow(item.diary_id, index, item.my_focus, 'topics')}>
              <View style={styles.follow}>
                <Text style={styles.followText}>{item.my_focus ? '取消关注' : '关注'}</Text>
              </View>
            </TouchableOpacity>
          </View>}
        </View>
      </View>
    </TouchableOpacity>
  }

  _onPress = (topicId, ownerId) => {
    this.props.navigation.navigate('TopicPage', {topicId, ownerId})
  }

  getSource = (img) => {
    return {uri: img}
  }

  _onPressFollow = (id, position, myFocus, type) => {
    this.props.onPressFollow(id, position, myFocus, type)
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 100
  },
  img: {
    width: 100,
    height: 100
  },
  title: {
    fontSize: 15,
    color: theme.text.globalTextColor
  },
  comment: {
    fontSize: 13,
    color: theme.text.globalSubTextColor
  },
  tag: {
    color: theme.text.globalSubTextColor,
    fontSize: 14,
    flex: 1
  },
  follow: {
    width: 75,
    height: 25,
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: 'rgba(133, 179, 104, 0.57)'
  },
  followText: {
    fontSize: theme.text.mdFontSize,
    textAlign: 'center',
    color: '#fff',
  },
})
