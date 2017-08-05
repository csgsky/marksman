import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

export default class Reminder extends Component {
  render () {
    return (
      <View style={styles.separator} />
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'red'
  }
})
