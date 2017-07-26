import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import theme from '../config/theme'
import One from '../img/diary_material_one.jpg'
import Two from '../img/diary_material_two.jpg'
import Three from '../img/diary_material_three.jpg'
import Four from '../img/diary_material_four.jpg'
import Five from '../img/diary_material_five.jpg'
import Six from '../img/diary_material_six.jpg'
import Seven from '../img/diary_material_seven.jpg'
import Eight from '../img/diary_material_eight.jpg'
import Nine from '../img/diary_material_nine.jpg'
import Ten from '../img/diary_material_ten.jpg'

export default class LightBoxPage extends Component {
  render () {
    const {state} = this.props.navigation
    console.warn('LightBoxPage ==> render ==> ' + state.params.img)
    return (<TouchableOpacity style={styles.view} activeOpacity={1} onPress={this.back}>
      <Image style={styles.img} source={this.getSource(state.params.img)} />
    </TouchableOpacity>)
  }

  getSource = (img) => {
    if (img === '0') {
      return One
    } else if (img === '1') {
      return Two
    } else if (img === '2') {
      return Three
    } else if (img === '3') {
      return Four
    } else if (img === '4') {
      return Five
    } else if (img === '5') {
      return Six
    } else if (img === '6') {
      return Seven
    } else if (img === '7') {
      return Eight
    } else if (img === '8') {
      return Nine
    } else if (img === '9') {
      return Ten
    }
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
    height: ((theme.screenWidth - 32) * 3) / 4
  }
})
