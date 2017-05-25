import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

export default class LabelPage extends Component {
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Text style={{color: 'red'}}>选择元素 A</Text>
        </View>
        <TouchableOpacity  style={{marginTop: 30}}onPress={this._onPress}>
          <Text style={{alignSelf: 'center'}}>
              进入下一页
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  _onPress = () => {
    this.props.navigation.navigate('LabelPageTwo', {message: '进入下一页'})
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})
