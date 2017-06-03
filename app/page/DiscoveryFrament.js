'use strict'
import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Separator from '../component/Separator'
export default class DiscoveryFrament extends Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <View style={styles.titleView}><Text style = {styles.title}>发现</Text></View>
        </View>
        <Separator/>
        <Text>发现</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: 'white'
  },
  titleView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 50,
    color: '#6a6a6a',
    fontSize: 18
  }
})
