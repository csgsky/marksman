import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { ColorPicker } from 'react-native-color-picker'

export default class ProfilePage extends Component {
  render () {
    return (
      <ColorPicker
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{flex: 1}}
      />
    )
  }
  _onPress = () => {
    this.props.navigation.navigate('SearchPage',{message: '搜索'})
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})