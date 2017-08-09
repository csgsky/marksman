import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native'
import Rx from 'rxjs'
import theme from '../../config/theme'

export default class RecommendUserItem extends Component {

  _onPressFollow = (myFocus, id, position) => {
    const {LovedFollowed} = this.props
    Rx.Observable.from(AsyncStorage.getItem('userId')).subscribe(
      (it) => {
        if (it === null) {
          this.props.navigation.navigate('Login', {come4: 'recommend'})
        } else {
          LovedFollowed(id, position, myFocus)
        }
      }
    )
  }
  _routerToPersonalPage = () => {
    const userId = this.props.item.user_id
    this.props.navigation.navigate('PersonalPage', {message: '备受宠爱', id: userId})
  }

  render() {
    const {item, position} = this.props
    return (<TouchableOpacity>
      <View style={[styles.item, {marginLeft: position === 0 ? 16 : 0}]}>
        <TouchableOpacity style={{width: 75, height: 75}} onPress={this._routerToPersonalPage}>
          <Image style={styles.img} source={item.avtar === '' ? theme.imgs.DefaultUserAvatar : {uri: item.avtar}} />
        </TouchableOpacity>
        <Text style={styles.name} numberOfLines={1}>{item.nickname}</Text>
        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this._onPressFollow(item.my_focus, item.user_id, position)}>
          <View style={[styles.follow, {backgroundColor: item.my_focus ? 'rgba(133, 179, 104, 0.57)' : 'rgba(133, 179, 104, 0.87)'}]}>
            <Text style={styles.followText}>{item.my_focus ? '取消关注' : '关注'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>)
  }

}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginRight: 30,
    alignItems: 'center',
    marginBottom: 16
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 38
  },
  name: {
    marginTop: 12,
    color: theme.text.globalTextColor,
    height: 18
  },
  follow: {
    width: 75,
    height: 25,
    borderRadius: 2,
    marginTop: 14,
    justifyContent: 'center'
  },
  followText: {
    fontSize: theme.text.mdFontSize,
    textAlign: 'center',
    color: '#fff',
  },
})
