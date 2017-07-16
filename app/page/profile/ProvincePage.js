import React, {Component} from 'react'
import {View, FlatList, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import PubSub from 'pubsub-js'
import theme from '../../config/theme'
import Next from '../../img/next.png'

const Province = require('../../constant/province.json')

export default class ProvincePage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '省份',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  getLocationItem = (item) => {
    return (<TouchableOpacity style={styles.itemView} onPress={() => this._routerCityPage(item.id)}>
      <Text style={styles.content}>{item.name}</Text>
      <Image style={styles.next} resizeMode="stretch" source={Next} />
    </TouchableOpacity>)
  }

  _routerCityPage = (provinceId) => {
    const key = this.props.navigation.state.key
    if (provinceId === '710000') {
      PubSub.publish('updateLocation', '台湾省')
      // console.warn('id ==> ', provinceId)
      this.props.navigation.goBack()
      return
    } else if (provinceId === '810000') {
      PubSub.publish('updateLocation', '香港特别行政区')
      this.props.navigation.goBack()
      return
    } else if (provinceId === '820000') {
      PubSub.publish('updateLocation', '澳门特别行政区')
      this.props.navigation.goBack()
      return
    }
    this.props.navigation.navigate('CityPage', {provinceId, key})
  }

  render() {
    return (<FlatList
      removeClippedSubviews={false}
      data={Province}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => this.getLocationItem(item)}
      />
    )
  }
}

const styles = StyleSheet.create({
  itemView: {
    height: 56,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  content: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor,
    flex: 1
  },
  next: {
    width: 8,
    height: 14,
    marginRight: 16,
    marginLeft: 14,
  }
})
