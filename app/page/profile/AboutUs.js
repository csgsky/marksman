import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
import Logo from '../../img/logo.png'

export default class AboutUsPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: ' 关于我们',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  render () {
    return (<View style={styles.view}>
      <Image source={Logo} resizeMode="contain" style={styles.icon}/>
      <Text style={styles.version}>浅 言 V1.0</Text>
    </View>)
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
  icon: {
    width: 75,
    height: 75,
    marginBottom: 26
  },
  version: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor
  }
})
