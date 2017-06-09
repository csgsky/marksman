import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
// import theme from '../../config/theme'

class Trash extends Component {
  render () {
    return (
      <View>
        <Text style={styles.title}>I am the Trash bin</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30
  }
})

export default Trash
