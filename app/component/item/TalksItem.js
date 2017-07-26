import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'

export default class TalksItem extends Component {
  _onPress = (topicId, ownerId, diaryId) => {
    this.props.navigation.navigate('TopicPage', {topicId, ownerId, diaryId})
  }

  _onPressFollow = (id, position, myFocus, type) => {
    this.props.onPressFollow(id, position, myFocus, type)
  }

  render () {
    const {item, index, type} = this.props
    const cover = item.icon_url
    const name = item.name
    const tag = item.tag
    const comment = `${item.views}浏览 | ${item.comment.num}评论 `
    return (<TouchableOpacity style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16, paddingTop: index === 0 ? 16 : 0}}
      activeOpacity = {0.3}
      onPress={() => this._onPress(item.talk_id, item.user_id, item.diary_id)}>
      <View style={styles.item}>
        <View style={{width: 100, height: 100, backgroundColor: '#FAFAFA'}}>
          <Image style={styles.img} resizeMode="stretch" source={{uri: cover}} />
        </View>
        {type !== 'followed' && <View style={{flex: 1, flexDirection: 'column', paddingLeft: 9}}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 6}}>
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 6}}>
            <View style={[styles.tagView, {backgroundColor: item.tag_color}]}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.comment}>{comment}</Text>
            </View>
          </View>
        </View>}
        {type === 'followed' && <View style={{flex: 1, flexDirection: 'column', paddingLeft: 9}}>
          <View style={{height: 25, flexDirection: 'column', justifyContent: 'center', paddingBottom: 6}}>
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 6}}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={[styles.comment, {marginBottom: 10}]}>{comment}</Text>
              <View style={[styles.tagView, {backgroundColor: item.tag_color}]}>
                <Text style={styles.tag}>{tag}</Text>
              </View>
            </View>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this._onPressFollow(item.talk_id, index, item.my_focus, 'topics')}>
              <View style={styles.follow}>
                <Text style={styles.followText}>{item.my_focus ? '取消关注' : '关注'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    </TouchableOpacity>)
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
  tagView: {
    height: 20,
    width: 70,
    backgroundColor: '#C5CAE9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tag: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
