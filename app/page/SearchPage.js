import React, {Component} from 'react'
import {StyleSheet, View, BackAndroid, Platform, FlatList, RefreshControl} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Rx from 'rxjs'
import * as actions from '../actions/searchAction'
import SearchTextInput from '../widget/SearchInput'
import EmptyView from '../component/EmptyView'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Separator from '../component/Separator'
import LoadingMore from '../component/LoadingMore'
import NoMoreData from '../component/NoMoreData'

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

  getItemSeparator = () => <ListSeparator />

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment={false} showRightTime />
  }
  getFooterCompt = () => {
    const {diarys, hasMoreData, isLoadingMore} = this.props
    if (diarys.length > 0 && hasMoreData && isLoadingMore) {
      return <LoadingMore />
    } else if (diarys.length > 0 && !hasMoreData) {
      return <NoMoreData />
    }
    return <View />
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore, searchText} = this.props
    if (hasMoreData && !isLoadingMore) {
      Rx.Observable.of('refresh').delay(800).subscribe(
        (it) => {
          this.props.actions.searchLoadingMore(page, searchText)
        }
      )
    }
  }

  render () {
    const {searchText, searchInputClearShow, empty, diarys, isRefreshing} = this.props
    console.warn('render ==> ', diarys.length)
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
      <Separator />
      {empty && <EmptyView message={'你还未写过相关的内容哦~'}/>}
      {diarys.length > 0 &&
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.getItemSeparator}
          ListFooterComponent={this.getFooterCompt}
          onEndReachedThreshold={0.1}
          onEndReached={this.handleLoadingMore}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              color="#ccc"
              refreshing={isRefreshing}
            />
          }
        />}
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
    diarys: search.diarys,
    hasMoreData: search.hasMoreData,
    isLoadingMore: search.isLoadingMore,
    page: search.page
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

