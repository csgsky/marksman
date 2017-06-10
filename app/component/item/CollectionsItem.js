import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import theme from '../../config/theme'
export default class CollectionItem extends Component {
  render () {
    const {item,navigation} = this.props
    let kh = '第 ' + item.kh + ' 期'
    return <TouchableOpacity style= {styles.item} activeOpacity={0.3} onPress={this._onRouterWrite}>
      <Image style={styles.cover} source={require('../../img/splash.jpg')}></Image>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.issn}>{kh}</Text>
        <Text style={styles.desc} numberOfLines = {2}>{item.descn}</Text>
      </View>
    </TouchableOpacity>
  }

  getSource = (img) => {
    return {uri: img}
  }

  _onRouterWrite = () => {
    const {item} = this.props
    this.props.navigation.navigate('CommonWebviewPage',{url: 'http://iranshao.com/', name: item.name})
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingTop: 18,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 10
  },
  cover: {
    width: 75,
    height: 100
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    paddingTop: 3
  },
  name: {
    color: theme.text.globalTextColor,
    fontSize: 16
  },
  issn: {
    color: theme.text.globalSubTextColor,
    fontSize: 14,
    marginTop: 8
  },
  desc: {
    color: theme.text.globalSubTextColor,
    fontSize: 14,
    marginTop: 8
  }
})
