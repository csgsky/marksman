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
    this._saveUseInfo()
  }

  async _saveUseInfo () {
    try {
    // 保存 token
    // 保存 userId
    // 保存 一堆其他的信息
      await AsyncStorage.setItem('token', 'a9a392bb28f550366c1c55f59b35aac0f94ff1eb')
      await AsyncStorage.setItem('first', 'first').then(
        () => {
          this.props.navigation.dispatch(resetAction)
        }
      )
      console.log('saveSuccess inner')
    } catch (error) {
      // console.log('error', error)
    }
  }
}


const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})