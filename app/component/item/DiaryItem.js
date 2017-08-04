import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage, NativeModules} from 'react-native'
import theme from '../../config/theme'
import {getDay, getYYMM, getDate, getHHMM, recentTime} from '../../utils/TimeUtils'
import CommentBar from '../CommentBar'
import One from '../../img/diary_material_one.jpg'
import Two from '../../img/diary_material_two.jpg'
import Three from '../../img/diary_material_three.jpg'
import Four from '../../img/diary_material_four.jpg'
import Five from '../../img/diary_material_five.jpg'
import Six from '../../img/diary_material_six.jpg'
import Seven from '../../img/diary_material_seven.jpg'
import Eight from '../../img/diary_material_eight.jpg'
import Nine from '../../img/diary_material_nine.jpg'
import Ten from '../../img/diary_material_ten.jpg'
import PublicStamp from '../../img/public_stamp.png'
import PrivateStamp from '../../img/private_stamp.png'

export default class DiaryItem extends Component {

  getIconSource = (img) => {
    return img === '' ? theme.imgs.DefaultUserAvatar : {uri: img}
  }

  getDiaryTpye = (item) => {
    if (item.ifprivate === 1) {
      return PublicStamp
    } else if (item.ifprivate === 0) {
      return PrivateStamp
    }
    return PrivateStamp
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
    const come4 = this.props.come4 || '浅记'
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => {
            if (!this.props.isDetail && !this.props.isDefault) {
              this.routeDiaryDetails()
            }
            if (this.props.showDialog) {
              this.props.showDialog()
            }
          }}
          style={{backgroundColor: 'white', paddingLeft: 16, paddingRight: 16, paddingTop: 16}}>
          {!this.props.showUserInfo && <View style={styles.time}>
            <Text style={[styles.day, {color: item.feelcolor}]}>{day}</Text>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
              <Text style={styles.week}>{week}</Text>
              <Text style={styles.year_month}>{yymm} {hhmm}</Text>
            </View>
            {this.props.showStamp && <Image style={styles.stamp} resizeMode="contain" source={this.getDiaryTpye(item)}/>}
          </View>}
          {this.props.showUserInfo && <TouchableOpacity style={[styles.time, {alignItems: 'center', width: 180}]} onPress={() => this.props.navigation.navigate('PersonalPage', {message: '日记', id: item.user.user_id})}>
            <Image style={{width: 40, height: 40, borderRadius: 20}} source={this.getIconSource(item.user.avtar)} />
            <View style={{flexDirection: 'column', marginLeft: 19}}>
              <Text style={{marginBottom: 3, fontSize: theme.text.xlgFontSize, color: theme.text.globalTextColor}} numberOfLines={1}>{item.user.nickname}</Text>
              <Text style={{marginTop: 4, fontSize: theme.text.mdFontSize, color: theme.text.globalSubTextColor}}>{recentTime(item.create_time)}</Text>
            </View>
          </TouchableOpacity>}
          {this.props.isDetail && <Text style={styles.body}>{content}</Text>}
          {!this.props.isDetail && <Text style={styles.body} numberOfLines={this.props.isDefault ? 10 : 5}>{content}</Text>}
          {img !== '' &&
            <View style={{backgroundColor: '#EEEEEE', marginBottom: hasComment ? 0 : 15}}><Image style={[styles.img]}
              source={this.getSource(img)}
              resizeMode="cover"/></View>
          }
        </TouchableOpacity>
        {hasComment &&
          <CommentBar
            diary
            myLike={item.my_like}
            likeNum={item.like.num}
            showShare={this.props.showShare}
            likeAction={() => { this.props.likeDiary(item.diary_id, item.user_id, item.my_like, index) }}
            commentAction={() => {
              this.routeDiaryDetails()
              NativeModules.TCAgent.track(come4, '评论')
            }}
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
      return Nine
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
    const come4 = this.props.come4 || '浅记'
    NativeModules.TCAgent.track(come4, '点日记进入日记详情页')
    const {navigation, item} = this.props
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        navigation.navigate('DiaryDetailPage', {me: false, item, come4})
      } else {
        if (result == item.user_id) {
          navigation.navigate('DiaryDetailPage', {me: true, item, come4})
          return
        }
        navigation.navigate('DiaryDetailPage', {me: false, item, come4})
      }
    })
  }
}

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  stamp: {
    width: 50,
    height: 30,
    marginRight: 20
  }
})
