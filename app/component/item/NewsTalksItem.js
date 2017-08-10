import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'
import {getMMDD} from '../../utils/TimeUtils'

export default class NewsTalksItem extends Component {

  _onPress = (topicId, ownerId, diaryId) => {
    setTimeout(() => {
      this.props.navigation.navigate('TopicPage', {topicId, ownerId, diaryId})
    }, 300)
  }

  render() {
    const {item} = this.props
    const createdTime = getMMDD(item.create_time)
    return (<TouchableOpacity style={styles.item}
      onPress={() => this._onPress(item.obj_id, item.user_id, item.msg_id)}>
      <View style={{backgroundColor: theme.pageBackgroundColor, height: 65, width: 65}}>
        <Image style={styles.img} source={{uri: item.obj_img}}/>
      </View>
      <View style={{flex: 1, marginLeft: 14}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.title, {flex: 1}]} numberOfLines={1}>{item.obj_name}</Text>
          <Text style={{color: theme.text.globalSubTextColor, fontSize: theme.text.lgFontSize}}>{createdTime}</Text>
        </View>
        <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
      </View>
    </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  img: {
    height: 65,
    width: 65
  },
  title: {
    color: theme.text.globalTextColor,
    fontSize: theme.text.xlgFontSize
  },
  content: {
    color: theme.text.globalSubTextColor,
    fontSize: theme.text.lgFontSize,
    marginTop: 14
  }
})
