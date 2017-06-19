import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

// import theme from '../config/theme'
import LoadingMore from '../component/LoadingMore'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

export default class WriteDiaryPage extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <LoadingMore />
      </View>
    )
  }
}
const styles = StyleSheet.create({

})
