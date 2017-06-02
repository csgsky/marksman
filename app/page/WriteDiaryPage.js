import React, {Component} from 'React'
import {StyleSheet, View, Text} from 'react-native'
import theme from '../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

export default class WriteDiaryPage extends Component {
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Text style={{color: 'red'}}>写日记</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  }
})
