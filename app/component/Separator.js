import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

export default class Separator extends Component {
  render () {
    return (
      <View style={styles.separator} />
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#f8f8f8'
  }
})
