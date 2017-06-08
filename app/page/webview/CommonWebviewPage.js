import React, {Component} from 'React'
import {StyleSheet, Text, WebView} from 'react-native'
import theme from '../../config/theme'

export default class CommonWebviewPage extends Component {
  render () {
    const {state} = this.props.navigation
    return <WebView style={styles.container} source={{uri: state.params.url}}/>
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})
