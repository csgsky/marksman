import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'

export default class RecommendUserItem extends Component {

  _routerToPersonalPage = () => {
    const userId = this.props.item.user_id
    this.props.navigation.navigate('PersonalPage', {message: '备受宠爱', id: userId})
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
    width: 110,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  name: {
    marginTop: 12,
    color: theme.text.globalTextColor
  }
})
