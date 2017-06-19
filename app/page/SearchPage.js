import React, {Component} from 'React'
import {StyleSheet, View, Text, BackAndroid, Platform} from 'react-native'
import theme from '../config/theme'
import * as actions from '../actions/searchAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper';
import SearchTextInput from '../widget/SearchInput'
import EmptyView from '../component/EmptyView'
class SearchPage extends Component {
  componentDidMount () {
    this.props.actions.searchPageInit()
    BackAndroid.addEventListener('hardwareBackPress', this._backPress)
  }


  render () {
    const {searchText, searchInputClearShow, empty} = this.props
    console.warn('render ==> empty ==>  ' + empty)
    return <View style={{flex: 1, marginTop: (Platform.OS === 'ios') ? 20 : 0}}>
      <SearchTextInput
        searchTextChange = {this._onSearchTextChange}
        backPress = {this._backPress}
        searchText={searchText}
        onSubmitEditing={this._onSubmitEditing}
        searchInputClearShow={searchInputClearShow}
        clearInput = {this._clearInput}
        title={'请输入您想要搜索的内容'}
      />
      {empty && <EmptyView message={'你还未写过相关的内容哦~'}/>}
    </View>
    
  }

  _backPress = () => {
    this.props.actions.searchPageBack()
    this.props.navigation.goBack()
  }

  _onSearchTextChange = (text) => {
    this.props.actions.searchTextChange(text)
  }

  _onSubmitEditing = () => {
    const {searchText} = this.props
    this.props.actions.searchDiary(searchText)
  }

  _clearInput = () => {
    this.props.actions.clearInput()
  }

  // _onPress = () => {
  //   this.props.navigation.navigate('SettingPage',{message: '设置'})
  // }
}

const styles = StyleSheet.create({
  
})

const mapStateToProps = (state) => {
  const {search} = state
  return {
    isRefreshing: search.isRefreshing,
    searchText: search.searchText,
    searchInputClearShow: search.searchInputClearShow,
    empty: search.empty,
    hasMore: search.hasMore,
    diarys: search.diarys
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

