import React, {Component} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import theme from '../config/theme'
export default class EmptyView extends Component {
  render () {
    const {message} = this.props
    return (
      <View style={styles.view}>
        <View style={styles.emptyView}>
          <Image style={styles.emptyImg} resizeMode ='contain' source={require('../img/search_empty.png')} />
          <Text style={styles.emptyText}>{message}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    flexDirection: 'column'
  },
  emptyImg: {
    width: 150,
    height: 75,
    alignSelf: 'center'
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#f89f33',
    alignSelf: 'center'
  }
})
