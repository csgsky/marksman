import React, {Component} from 'react'
import {View, FlatList, RefreshControl, AsyncStorage} from 'react-native'
import Rx from 'rxjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/hotDiaryAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import LoadingMore from '../component/LoadingMore'
import NoMoreData from '../component/NoMoreData'
import PubSub from 'pubsub-js'

class HotDiary extends Component {
  componentDidMount () {
    this.props.actions.hotDiaryInit(0)
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
  }


  getItemSeparator = () => <ListSeparator />

  onRefresh = () => {
    this.props.actions.hotDiaryInit(0)
  }
  _likeDiary = (diaryId, ownerId, myLike, index) => {
    console.log({diaryId, ownerId, myLike, index})
    if (myLike) {
      return
    }
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'recentDiary'})
      } else {
        this.props.actions.rencentDiaryLike({diaryId, ownerId, index})
      }
    })
  }

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment showRightTime likeDiary={this._likeDiary} index={index}/>
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore} = this.props
    if (hasMoreData && !isLoadingMore) {
      Rx.Observable.of('refresh').delay(800).subscribe(
        (it) => {
          this.props.actions.hotDiaryLoadingMore(page)
        }
      )
    }
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

  render () {
    const {diarys, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.getItemSeparator}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.getFooterCompt}
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
  const {hotDiary} = state
  return {
    isRefreshing: hotDiary.isRefreshing,
    diarys: hotDiary.diarys,
    hasMoreData: hotDiary.hasMoreData,
    isLoadingMore: hotDiary.isLoadingMore,
    page: hotDiary.page
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(HotDiary)
