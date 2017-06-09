import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Button} from 'react-native'
import theme from '../../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { ColorPicker } from 'react-native-color-picker'

export default class ProfilePage extends Component {
  render () {
    return (
      <View>
        <ColorPicker
          onColorSelected={color => alert(`Color selected: ${color}`)}
          style={{flex: 1}}
        />
        <Text onPress={this._onPress}>垃圾箱</Text>
      </View>
    )
  }
  _onPress = () => {
    this.props.navigation.navigate('TrashPage',{message: '垃圾箱'})
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})