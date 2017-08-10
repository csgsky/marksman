import React, {Component} from 'react'
import {View, FlatList, RefreshControl, AsyncStorage, NativeModules, Platform} from 'react-native'
import Rx from 'rxjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/recentDiaryAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Footer from '../component/Footer'
import ShareModal from '../widget/ShareModal'
import theme from '../config/theme'

class RecentDiary extends Component {

  constructor (props) {
    super(props)
    this.state = {
      shareVisible: false, // 显示分享
      wechatMetadata: null
    }
  }

  componentDidMount () {
    NativeModules.TCAgent.track('足印', '最新')
    this.props.actions.recentDiaryInit(0)
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
  }

  onRefresh = () => {
    NativeModules.TCAgent.track('足印', '最新')
    this.props.actions.recentDiaryInit(0)
  }

  _likeDiary = (diaryId, ownerId, myLike, index) => {
    NativeModules.TCAgent.track('足印', '点赞')
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
      showUserInfo
      come4="最新"
      showShare={() => this.showShare(index, item)}
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

  hideShare = () => {
    this.setState({
      shareVisible: false
    })
  }

  getWechatShareMeta = (index, item) => {
    const user = item.user
    return {
      type: 'news',
      webpageUrl: `http://qycdn.zhuoyoutech.com/h5/diary.html?diary_id=${item.diary_id}`,
      title: '来自' + user.nickname + '的日记',
      description: item.content
    }
  }

  showShare = (index, item) => {
    // 将分享数据进行准备
    const wechatMetadata = this.getWechatShareMeta(index, item)
    this.setState({
      shareVisible: true,
      wechatMetadata
    })
  }

  render () {
    const {diarys, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
        <ShareModal
          visible={this.state.shareVisible}
          hideShare={this.hideShare}
          wechatMetadata={this.state.wechatMetadata}
        />
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          ItemSeparatorComponent={this.getItemSeparator}
          ListFooterComponent={this.getFooterCompt}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          removeClippedSubviews={Platform.OS === 'android'}
          keyExtractor={item => item.diary_id}
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

