import React, {Component} from 'react'
import {View, FlatList, RefreshControl} from 'react-native'
import Rx from 'rxjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/recentDiaryAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import LoadingMore from '../component/LoadingMore'
import NoMoreData from '../component/NoMoreData'

class RecentDiary extends Component {
  componentDidMount () {
    this.props.actions.recentDiaryInit(0)
  }

  onRefresh = () => {
    this.props.actions.recentDiaryInit(0)
  }

  getItemSeparator = () => <ListSeparator />

  getItemCompt = ({item}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment showRightTime />
  }

  getFooterCompt = () => {
    const {diarys, hasMoreData, isLoadingMore} = this.props
    console.warn('getFooterCompt diary length ==> ' + diarys.length)
    console.warn('getFooterCompt diary hasMoreData ==> ' + hasMoreData)
    console.warn('getFooterCompt diary isLoadingMore ==> ' + isLoadingMore)
    if (diarys.length > 0 && hasMoreData && isLoadingMore) {
      return <LoadingMore />
    } else if (diarys.length > 0 && !hasMoreData) {
      return <NoMoreData />
    }
    return <View />
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore} = this.props
    if (hasMoreData && !isLoadingMore) {
      Rx.Observable.of('refresh').delay(800).subscribe(
        (it) => {
          // todo
          this.props.actions.recentDiaryLoadingMore(page)
        }
      )
    }
  }

  render () {
    const {diarys, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
        />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  const {recentDiary} = state
  return {
    isRefreshing: recentDiary.isRefreshing,
    diarys: recentDiary.diarys,
    hasMoreData: recentDiary.hasMoreData,
    isLoadingMore: recentDiary.isLoadingMore,
    page: recentDiary.page
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RecentDiary)

