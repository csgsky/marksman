import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Button, StyleSheet} from 'react-native'
import theme from '../../config/theme'
export default class TopUserItem extends Component {
  render () {
    const {item} = this.props
    let desc = '公开日记 ' + item.diary_num + ' 粉丝 ' + item.focus_num + ' 收获点赞 ' + item.like_num
    return <View onPress={this._routerToPersonalPage}>
      <View style={styles.item}>
        <View style={styles.itemT}>
          <TouchableOpacity onPress={this._routerToPersonalPage}>
            <Image style= {styles.img} source={require('../../img/test_icon.jpeg')}></Image>
          </TouchableOpacity>
          <View style={{flex: 1, paddingLeft: 6}}>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
              <Text style={styles.name}>{item.nickname}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.desc}>{desc}</Text>
            </View>
          </View>
          <View style={{height: 20, width: 76, marginTop: 8}}>
            <Button
              onPress={this._focus}
              title="关注"
              color='rgba(133,179,104,1)'
            />
          </View>
        </View>
        <Text style={styles.sign} numberOfLines = {1}>{item.sign}</Text>
      </View>
    </View>
  }

  _routerToPersonalPage = () => {
    this.props.navigation.navigate('PersonalPage',{message: '个人主页'})
  }

  _focus = () => {
    alert('关注')
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
  }
})