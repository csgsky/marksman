import React, {Component} from 'React'
import {StyleSheet, View, Text} from 'react-native'
import theme from '../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import Swiper from 'react-native-swiper';
import SearchTextInput from '../widget/SearchInput'
export default class SearchPage extends Component {


  render () {
    const {searchText} = this.props
    return <SearchTextInput
      searchTextChange = {this._onSearchTextChange}
      backPress = {this._backPress}
      searchText={searchText}
      title={'请输入您想要搜索的内容'}
     />
  }



  _onSearchInputClearShow = () => {
    
  }

  _backPress = () => {
    this.props.navigation.goBack()
  }

  _onSearchTextChange = (text) => {
    console.warn(text)
  }

  _onPress = () => {
    this.props.navigation.navigate('SettingPage',{message: '设置'})
  }



}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenWidth
  },
   wrapper: {
  },
  slide1: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
