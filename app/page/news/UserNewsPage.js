import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native'
import theme from '../../config/theme'

export default class UserNewsPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '用户',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  render () {
    return (<Text>用户</Text>)
  }
}
