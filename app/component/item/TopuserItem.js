import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native'
import Rx from 'rxjs'
import theme from '../../config/theme'

export default class TopUserItem extends Component {

  _onPressFollow = (myFocus, id, position) => {
    const {LovedFollowed} = this.props
    Rx.Observable.from(AsyncStorage.getItem('userId')).subscribe(
      (it) => {
        if (it === null) {
          this.props.navigation.navigate('Login', {come4: 'profile'})
        } else {
          LovedFollowed(id, position, myFocus)
        }
      }
    )
  }

  _routerToPersonalPage = () => {
    const userId = this.props.item.user_id
    setTimeout(() => {
      this.props.navigation.navigate('PersonalPage', {message: '个人主页', id: userId})
    }, 300)
  }

  render () {
    const {item, position} = this.props
    const desc = '公开日记 ' + item.diary_num + '   粉丝 ' + item.focus_num + '   收获赞 ' + item.like_num
    return <TouchableOpacity onPress={this._routerToPersonalPage}>
      <View style={styles.item}>
        <View style={styles.itemT}>
          <View style={{width: 52, height: 52, borderRadius: 26}}>
            <Image style={styles.img} source={item.avtar === '' ? theme.imgs.DefaultUserAvatar : {uri: item.avtar}} />
          </View>
          <View style={{flex: 1, paddingLeft: 13}}>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
              <Text style={styles.name}>{item.nickname}</Text>
            </View>
            <Text style={styles.sign} numberOfLines={1}>{item.sign === '' ? '慵懒，也是一种生活姿态！' : item.sign}</Text>
            <View style={{flex: 1}}>
              <Text style={styles.desc}>{desc}</Text>
            </View>
          </View>
          <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this._onPressFollow(item.my_focus, item.user_id, position)}>
            <View style={[styles.follow, {backgroundColor: item.my_focus ? 'rgba(133, 179, 104, 0.57)' : 'rgba(133, 179, 104, 0.87)'}]}>
              <Text style={styles.followText}>{item.my_focus ? '取消关注' : '关注'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  }

}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 15,
    width: theme.screenWidth
  },
  itemT: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 52,
    height: 52,
    borderRadius: 26
  },
  name: {
    color: theme.text.globalTextColor,
    fontSize: 15
  },
  desc: {
    color: theme.text.globalSubTextColor,
    fontSize: 12,
    marginTop: 7
  },
  sign: {
    color: theme.text.globalSubTextColor,
    fontSize: 12,
    marginTop: 6
  },
  follow: {
    width: 76,
    height: 28,
    borderRadius: 2,
    justifyContent: 'center'
  },
  followText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14
  },
})
