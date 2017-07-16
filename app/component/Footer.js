import React, { Component} from 'react'
import {Text, View, StyleSheet } from 'react-native'
import theme from '../config/theme'

export default class Footer extends Component {
  render () {
    const {hasMoreData} = this.props
    const text = hasMoreData ? '正在加载...' : '全部加载完毕'
    return (<View style={{justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: '#FAFAFA'}}>
      <Text style={styles.textStyle} numberOfLines={1}>{text}</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  textStyle: {
    width: theme.screenWidth,
    textAlign: 'center',
    color: '#313131',
    fontSize: 15
  }
})
