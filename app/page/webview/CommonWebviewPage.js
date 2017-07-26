import React, {Component} from 'react'
import {StyleSheet, View, WebView, TouchableOpacity, Image, Platform} from 'react-native'
import theme from '../../config/theme'
import Protocol from '../../constant/agreement.html'

export default class CommonWebviewPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
    headerStyle: {elevation: 1, backgroundColor: '#fff'},
    headerRight: <View />,
    gesturesEnabled: false,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  render () {
    const {state} = this.props.navigation
    if (state.params.type === 'protocol') {
      const source = Platform.OS === 'ios' ? Protocol : { uri: 'file:///android_asset/agreement.html' };
      return <WebView style={styles.container} source={source}/>
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
