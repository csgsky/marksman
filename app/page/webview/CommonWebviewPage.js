import React, {Component} from 'react'
import {StyleSheet, View, WebView, TouchableOpacity, Image} from 'react-native'
import theme from '../../config/theme'
import Protocol from '../../constant/agreement.html'

export default class CommonWebviewPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
    headerStyle: {elevation: 1, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  render () {
    const {state} = this.props.navigation
    if (state.params.type === 'protocol') {
      return <WebView style={styles.container} source={Protocol}/>
    }
    return <WebView style={styles.container} source={{uri: state.params.url}}/>
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})
