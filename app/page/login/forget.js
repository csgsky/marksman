import React, { Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import theme from '../../config/theme'

export default class Forget extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '忘记密码',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  render () {
    const text = '忘记密码'
    return (<View style={{justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: '#FAFAFA'}}>
      <Text style={styles.textStyle} numberOfLines={1}>{text}</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  textStyle: {
    width: theme.screenWidth,
    textAlign: 'center',
    color: '#313131',
    fontSize: 15
  }
})
