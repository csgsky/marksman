import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native'
import theme from '../../config/theme'
import {getDay, getYYMM, getDate, getHHMM, recentTime} from '../../utils/TimeUtils'
import CommentBar from '../CommentBar'
import One from '../../img/diary_material_one.jpeg'
import Two from '../../img/diary_material_two.jpg'
import Three from '../../img/diary_material_three.jpg'
import Four from '../../img/diary_material_four.jpeg'
import Five from '../../img/diary_material_five.jpeg'
import Six from '../../img/diary_material_six.jpeg'
import Seven from '../../img/diary_material_seven.jpeg'
import Eight from '../../img/diary_material_eight.jpeg'
import Nine from '../../img/diary_material_nine.jpeg'
import Ten from '../../img/diary_material_ten.jpeg'

export default class DiaryItem extends Component {

  getIconSource = (img) => {
    return img === '' ? theme.imgs.DefaultUserAvatar : {uri: img}
  }

  render () {
    const { item, index } = this.props
    const day = getDay(item.create_time)
    const week = getDate(item.create_time)
    const yymm = getYYMM(item.create_time)
    const hhmm = getHHMM(item.create_time)
    const content = item.content
    const img = item.img
    const hasComment = this.props.hasComment
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => {
            if (this.props.showRightTime) {
              this.routeDiaryDetails()
            }
            if (this.props.showDialog) {
              this.props.showDialog()
            }
          }}
          style={{backgroundColor: 'white', paddingLeft: 16, paddingRight: 16, paddingTop: this.props.showRightTime ? 16 : 0}}>
          {!this.props.showUserInfo && <View style={styles.time}>
            <Text style={[styles.day, {color: item.feelcolor}]}>{day}</Text>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
              <Text style={styles.week}>{week}</Text>
              <Text style={styles.year_month}>{yymm}</Text>
            </View>
            {this.props.showRightTime && <Text style={styles.hour_minute}>{hhmm}</Text>}
          </View>}
          {this.props.showUserInfo && <TouchableOpacity style={[styles.time, {alignItems: 'center'}]} onPress={() => this.props.navigation.navigate('PersonalPage', {message: '备受宠爱', id: item.user.user_id})}>
            <Image style={{width: 40, height: 40, borderRadius: 20}} source={this.getIconSource(item.user.avtar)} />
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 19}}>
              <Text style={{marginBottom: 3, fontSize: theme.text.xlgFontSize, color: theme.text.globalTextColor}}>{item.user.nickname}</Text>
              <Text style={{marginTop: 4, fontSize: theme.text.mdFontSize, color: theme.text.globalSubTextColor}}>{recentTime(item.create_time)}</Text>
            </View>
          </TouchableOpacity>}
          {!this.props.showRightTime && <Text style={styles.body}>{content}</Text>}
          {this.props.showRightTime && <Text style={styles.body} numberOfLines={5}>{content}</Text>}
          {img !== '' && <TouchableOpacity onPress={this.props.showRightTime && this.photoView} activeOpacity={0.8}>
            <Image style={[styles.img, {marginBottom: hasComment ? 0 : 15}]}
              source={this.getSource(img)}/>
            </TouchableOpacity>}
        </TouchableOpacity>
        {hasComment &&
          <CommentBar
            myLike={item.my_like}
            likeNum={item.like.num}
            showShare={this.props.showShare}
            likeAction={() => { this.props.likeDiary(item.diary_id, item.user_id, item.my_like, index) }}
            commentAction={() => this.routeDiaryDetails()}
            commentsNum={item.comment.num}/>}
      </View>
    )
  }

  getSource = (img) => {
    if (img === '0') {
      return One
    } else if (img === '1') {
      return Two
    } else if (img === '2') {
      return Three
    } else if (img === '3') {
      return Four
    } else if (img === '4') {
      return Five
    } else if (img === '5') {
      return Six
    } else if (img === '6') {
      return Seven
    } else if (img === '7') {
      return Eight
    } else if (img === '8') {
      return Ten
    } else if (img === '9') {
      return Ten
    }
    return {uri: img}
  }

  photoView = () => {
    const {navigation, item} = this.props
    navigation.navigate('LightBoxPage', {img: item.img})
  }

  routeDiaryDetails = () => {
    const {navigation, item} = this.props
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        navigation.navigate('DiaryDetailPage', {me: false, item})
      } else {
        if (result == item.user_id) {
          navigation.navigate('DiaryDetailPage', {me: true, item})
          return
        }
        navigation.navigate('DiaryDetailPage', {me: false, item})
      }
    })
  }
}

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row'
  },
  day: {
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
    height: ((theme.screenWidth - 32) * 3) / 4
  }
})
