import React, {Component} from 'React'
import {StyleSheet, View, Text} from 'react-native'
import theme from '../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
const resetAction = NavigationActions.reset({
  index: 2,
  actions: [
    NavigationActions.navigate({routeName: 'Tab'}),
    NavigationActions.navigate({routeName: 'ProfilePage'}),
    NavigationActions.navigate({routeName: 'SearchPage'}),
  ]
})
export default class SettingPage extends Component {
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Text style={{color: 'red'}} onPress={this._onPress}>设置</Text>
        </View>
      </View>
    )
  }
   _onPress = () => {
     this.props.navigation.dispatch(resetAction)
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})
