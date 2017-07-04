import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'

export default class RecommendUserItem extends Component {

  _routerToPersonalPage = () => {
    const userId = this.props.item.user_id
    this.props.navigation.navigate('PersonalPage', {message: '个人主页', id: userId})
  }

  render() {
    const {item} = this.props
    return (<TouchableOpacity onPress={this._routerToPersonalPage}>
      <View style={styles.item}>
        <Image style={styles.img} source={item.avtar === '' ? theme.imgs.DefaultUserAvatar : {uri: item.avtar}} />
        <Text style={styles.name} numberOfLines={1}>{item.nickname}</Text>
      </View>
    </TouchableOpacity>)
  }

}
const styles = StyleSheet.create({
  item: {
    width: theme.screenWidth / 3,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 32
  },
  img: {
    width: (theme.screenWidth / 3) - 32,
    height: (theme.screenWidth / 3) - 32,
    borderRadius: ((theme.screenWidth / 3) - 32) / 2
  },
  name: {
    marginTop: 12,
    color: theme.text.globalTextColor
  }
})
