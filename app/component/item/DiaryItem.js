import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native'
import theme from '../../config/theme'
import {getDay, getYYMM, getDate, getHHMM} from '../../utils/TimeUtils'
import CommentItem from '../../widget/CommentItem'
export default class DiaryItem extends Component {
  render () {
    const { item } = this.props
    let day = getDay(item.create_time)
    let week = getDate(item.create_time)
    let yymm = getYYMM(item.create_time)
    let hhmm = getHHMM(item.create_time)
    let content = item.content
    let img = item.img
    let hasComment = this.props.hasComment
    return (
      <View>
        <TouchableOpacity activeOpacity = {0.8} onPress={this.props.showRightTime && this.diaryDetails} style={{paddingLeft: 16, paddingRight: 16, paddingTop: this.props.showRightTime ? 16 : 0}}>
          <View style={styles.time}>
            <Text style={styles.day}>{day}</Text>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
              <Text style={styles.week}>{week}</Text>
              <Text style={styles.year_month}>{yymm}</Text>
            </View>
            {this.props.showRightTime && <Text style={styles.hour_minute}>{hhmm}</Text>}
          </View>
          {<Text style={styles.body} numberOfLines={6}>{content}</Text>}
          {img !== '' && <TouchableOpacity onPress= {this.props.showRightTime && this.photoView} activeOpacity = {0.8}>
                           <Image style={[styles.img, {marginBottom: hasComment ? 0 : 15}]} 
                                  source={this.getSource(img)}/>
                                  </TouchableOpacity>}
        </TouchableOpacity>
        {hasComment && <CommentItem comment={item.comment} like = {item.like}/>}
      </View>
      
      
    )
  }

  getSource = (img) => {
    return {uri: img}
  }

  photoView = () => {
    const {navigation, item} = this.props
    navigation.navigate('LightBoxPage',{img: item.img})
  }

  diaryDetails = () => {
    const {navigation, item} = this.props
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        navigation.navigate('DiaryDetailPage', {me: false, item: item})
      } else {
        if (result === item.user_id) {
          navigation.navigate('DiaryDetailPage', {me: true, item: item})
        } else {
          navigation.navigate('DiaryDetailPage', {me: false, item: item})
        }
      }
    })
  }
}

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row'
  },
  day: {
    color: '#f48cc3',
    fontSize: 40
  },
  week: {
    color: theme.text.globalSubTextColor,
    fontSize: 13,
    paddingTop: 8
  },
  year_month: {
    color: theme.text.globalSubTextColor,
    fontSize: 13,
    marginTop: 3
  },
  hour_minute: {
    color: theme.text.globalSubTextColor,
    fontSize: 13
  },
  body: {
    color: theme.text.globalTextColor,
    fontSize: 15,
    marginTop: 8,
    lineHeight: 24,
    marginBottom: 15
  },
  img: {
    width: theme.screenWidth - 32,
    height: theme.screenWidth - 200
  }
})
