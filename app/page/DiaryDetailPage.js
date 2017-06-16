import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import theme from '../config/theme'

export default class DiaryDetailPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '日记详情页',
    headerStyle: {elevation: 0},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    let diaryId = this.props.navigation.state.params.diaryId;
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View > 
          <Text style={{color: 'red'}}>日记的 id:  + { this.props.navigation.state.params.diaryId}</Text>
          {this.props.navigation.state.params.me ? <Text style={{color: 'red'}}>我的</Text> : <Text style={{color: 'red'}}>不是我的</Text>}
        </View>
      </View>
    )
  }
}
