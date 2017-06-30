import React, {Component} from 'react'
import {StyleSheet, View, BackAndroid, Platform} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/searchAction'

import SearchTextInput from '../widget/SearchInput'
import EmptyView from '../component/EmptyView'

class SearchPage extends Component {
  componentDidMount () {
    this.props.actions.searchPageInit()
    BackAndroid.addEventListener('hardwareBackPress', this._backPress)
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


  render () {
    const {searchText, searchInputClearShow, empty} = this.props
    return (<View style={{flex: 1, paddingTop: (Platform.OS === 'ios') ? 20 : 0}}>
      <SearchTextInput
        searchTextChange={this._onSearchTextChange}
        backPress={this._backPress}
        searchText={searchText}
        onSubmitEditing={this._onSubmitEditing}
        searchInputClearShow={searchInputClearShow}
        clearInput={this._clearInput}
        title={'请输入您想要搜索的内容'}
      />
      {empty && <EmptyView message={'你还未写过相关的内容哦~'}/>}
    </View>)
  }
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

