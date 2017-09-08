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
import Report from '../../img/report.png'

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
    const imgD = item.img_d
    const imgR = item.img_r
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
          {this.props.showUserInfo && <View activeOpacity={1} style={[styles.time, {alignItems: 'center', flex: 1}]} >
            <TouchableOpacity onPress={this.routePersonalPage}>
              <Image style={{width: 40, height: 40, borderRadius: 20}} resizeMode="cover" source={this.getIconSource(item.user.avtar)} />
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 19}}>
              <Text style={{marginBottom: 3, fontSize: theme.text.xlgFontSize, color: theme.text.globalTextColor}} numberOfLines={1}>{item.user.nickname}</Text>
              <Text style={{marginTop: 4, fontSize: theme.text.mdFontSize, color: theme.text.globalSubTextColor}}>{recentTime(item.create_time)}</Text>
            </View>
            <TouchableOpacity style={{marginLeft: 16, width: 40, height: 40, alignItems: 'center'}} onPress={this.props.showReport}>
              <Image source={Report} style={{marginTop: 4}}/>
            </TouchableOpacity>
          </View>}
          <Text style={styles.body} numberOfLines={this.props.isDetail ? 100 : 5}>{content}</Text>
          {img !== '' &&
            <TouchableOpacity onPress={this.photoView} activeOpacity={1} style={{backgroundColor: '#EEEEEE', marginBottom: hasComment ? 0 : 15}}>
              <Image style={styles.img}
                source={this.getSource(img, imgD)}
                resizeMode="cover"/></TouchableOpacity>
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

  getSource = (img, imgD) => {
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
    return {uri: imgD}
  }

  photoView = () => {
    if (this.props.isDetail) {
      const {navigation, item} = this.props
      navigation.navigate('LightBoxPage', {imgR: item.img_r, img: item.img})
    } else if (!this.props.isDetail && !this.props.isDefault) {
      this.routeDiaryDetails()
    }
  }

  routePersonalPage = () => {
    const {navigation, item} = this.props
    setTimeout(() => {
      AsyncStorage.getItem('userId').then((result) => {
        if (result === null) {
          navigation.navigate('PersonalPage', {me: true, message: '日记', id: item.user.user_id})
        } else {
          if (result == item.user_id) {
            navigation.navigate('PersonalPage', {me: true, message: '日记', id: item.user.user_id})
            return
          }
          navigation.navigate('PersonalPage', {me: false, message: '日记', id: item.user.user_id})
        }
      })
    }, 300)
  }

  routeDiaryDetails = () => {
    const come4 = this.props.come4 || '浅记'
    NativeModules.TCAgent.track(come4, '点日记进入日记详情页')
    const {navigation, item} = this.props
    setTimeout(() => {
      AsyncStorage.getItem('userId').then((result) => {
        if (result === null) {
          navigation.navigate('DiaryDetailPage', {me: false, item, come4})
        } else {
          if (result === item.user_id) {
            navigation.navigate('DiaryDetailPage', {me: true, item, come4})
            return
          }
          navigation.navigate('DiaryDetailPage', {me: false, item, come4})
        }
      })
    }, 300)
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
    lineHeight: 26,
    marginBottom: 15
  },
  img: {
    width: theme.screenWidth - 32,
    height: ((theme.screenWidth - 32) * 2) / 3
  },
  stamp: {
    width: 50,
    height: 30
  }
})
