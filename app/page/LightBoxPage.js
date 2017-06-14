import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import theme from '../config/theme'
export default class LightBoxPage extends Component {
  render () {
    const {state} = this.props.navigation
    console.warn('LightBoxPage ==> render ==> ' + state.params.img)
    return <TouchableOpacity style={styles.view} activeOpacity = {1} onPress = {this.back}>
        <Image style={styles.img} source = {this.getSource(state.params.img)}></Image>
      </TouchableOpacity>
  }

  getSource = (img) => {
    return {uri: img}
  }

  back = () => {
    this.props.navigation.goBack()
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: theme.screenWidth - 32,
    height: theme.screenWidth - 200
  }
})
