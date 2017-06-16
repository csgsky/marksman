import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import theme from '../config/theme'

export default class ListSeparator extends Component {
  render () {
    return <View style={styles.separator}/>
  }
}

const styles = StyleSheet.create({
  separator: {
    marginLeft: 16,
    height: 0.5,
    backgroundColor: theme.border.color
  }
})
