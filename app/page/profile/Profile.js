import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

export default class ProfilePage extends Component {
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Text style={{color: 'red'}}>个人</Text>
        </View>
      </View>
    )
  }
  _onPress = () => {
    // this.props.navigation.navigate('LabelPageTwo', {message: 'hello'})
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})