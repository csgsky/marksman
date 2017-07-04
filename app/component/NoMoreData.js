import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import theme from '../config/theme'

export default class NoMoreData extends Component {
  render () {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>主子，我也是有底线的~~</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    height: 75,
    backgroundColor: '#FAFAFA',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    color: theme.text.globalSubTextColor,
    alignSelf: 'center'
  }
})
