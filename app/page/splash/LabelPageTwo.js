import React, {Component} from 'React'
import {StyleSheet, View, Text, TextInput, AsyncStorage,TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Tab'})
      ]
    })
export default class LabelPageTwo extends Component {
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Text style={{color: 'red'}}>选择元素 B</Text>
        </View>
        <TouchableOpacity  style={{marginTop: 30}}onPress={this._onPress}>
          <Text style={{alignSelf: 'center'}}>
              进入主页
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  _onPress = () => {
    AsyncStorage.setItem('first', 'first').then(
      () => {
        this.props.navigation.dispatch(resetAction)
      }
  )  
    // this.props.navigation.navigate('Login', {message: 'nextPage'})
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})