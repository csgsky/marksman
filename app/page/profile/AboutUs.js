import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
import Logo from '../../img/logo.png'

export default class AboutUsPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: ' 关于我们',
    headerStyle: {elevation: 0.3, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  render () {
    return (<View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.view}>
        <Image source={Logo} resizeMode="contain" style={styles.icon}/>
        <Text style={styles.version}>浅 言 V1.1.1</Text>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 35}}>
        <Text style={{fontSize: 16, color: '#767676'}}>上海卓悠网络科技有限公司</Text>
        <Text style={{fontSize: 16, color: '#767676', marginTop: 10}}>版权所有</Text>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
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

