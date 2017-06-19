import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

export default class LoadingMore extends Component {
  render () {
    return (
      <View style={styles.view}>
        <View style={styles.emptyView}>
          <Text style={styles.text}>正在加载中......</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    flexDirection: 'column'
  },
  text: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center'
  }
})
