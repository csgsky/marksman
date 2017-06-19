import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'

export default class TopUserItem extends Component {

  _onPressFollow = (myFocus, id, position) => {
    const {LovedFollowed} = this.props
    if (myFocus === 0) {
      // 关注
      LovedFollowed(id, position, myFocus)
    } else {
      // 取消关注
      LovedFollowed(id, position, myFocus)
    }
  }

  _routerToPersonalPage = () => {
    this.props.navigation.navigate('PersonalPage', {message: '个人主页'})
  }

  render () {
    const {item, position} = this.props
    const desc = '公开日记 ' + item.diary_num + ' 粉丝 ' + item.focus_num + ' 收获点赞 ' + item.like_num
    return <View onPress={this._routerToPersonalPage}>
      <View style={styles.item}>
        <View style={styles.itemT}>
          <TouchableOpacity onPress={this._routerToPersonalPage}>
            <Image style={styles.img} source={require('../../img/test_icon.jpeg')} />
          </TouchableOpacity>
          <View style={{flex: 1, paddingLeft: 6}}>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
              <Text style={styles.name}>{item.nickname}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.desc}>{desc}</Text>
            </View>
          </View>
          <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this._onPressFollow(item.my_focus, item.user_id, position)}>
            <View style={styles.follow}>
              <Text style={styles.followText}>{item.my_focus ? '取消关注' : '关注'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.sign} numberOfLines={1}>{item.sign}</Text>
      </View>
    </View>
  }

}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  itemT: {
    flexDirection: 'row'
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  name: {
    color: theme.text.globalTextColor,
    fontSize: 15
  },
  desc: {
    color: theme.text.globalSubTextColor,
    fontSize: 12,
    marginTop: 4
  },
  sign: {
    color: theme.text.globalSubTextColor,
    fontSize: 12,
    marginTop: 8
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
