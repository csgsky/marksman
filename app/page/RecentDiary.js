import React, {Component} from 'react'
import {View, FlatList, RefreshControl, AsyncStorage} from 'react-native'
import Rx from 'rxjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/recentDiaryAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Footer from '../component/Footer'


class RecentDiary extends Component {
  componentDidMount () {
    this.props.actions.recentDiaryInit(0)
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
  }

  onRefresh = () => {
    this.props.actions.recentDiaryInit(0)
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

  getItemSeparator = () => <ListSeparator />

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return (<DiaryItem item={item}
      navigation={navigation}
      hasComment
      showRightTime
      showUserInfo
      likeDiary={this._likeDiary}
      index={index}/>)
  }

  getFooterCompt = () => {
    const {diarys, hasMoreData} = this.props
    if (diarys.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
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

