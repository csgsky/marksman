import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'

export default class TalksItem extends Component {
  render () {
    const {item, index, type} = this.props
    console.log(this.props)
    const cover = item.icon_url
    const name = item.name
    const tag = item.tag
    const comment = `${item.views}浏览 | ${item.comment.num}评论 `
    return (<TouchableOpacity style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16, paddingTop: index === 0 ? 16 : 0}}
      activeOpacity = {0.3}
      onPress={() => this._onPress(item.talk_id, item.user_id, item.diary_id)}>
      <View style={styles.item}>
        <Image style={styles.img} source={{uri: cover}} />
        <View style={{flex: 1, flexDirection: 'column', paddingLeft: 9}}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingBottom: 6}}>
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
          </View>
          {type !== 'followed' && <View style={{flex: 1, flexDirection: 'row', paddingTop: 6}}>
            <Text style={styles.tag}>{tag}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.comment}>{comment}</Text>
            </View>
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
    </TouchableOpacity>)
  }

  _onPress = (topicId, ownerId, diaryId) => {
    console.log({topicId, ownerId})
    this.props.navigation.navigate('TopicPage', {topicId, ownerId, diaryId})
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
    color: 'white',
    fontSize: 14,
    height: 20,
    width: 70,
    textAlign: 'center',
    backgroundColor: '#C5CAE9'
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
