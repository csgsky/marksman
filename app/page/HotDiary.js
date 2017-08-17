import React, {Component} from 'react'
import {View, FlatList, RefreshControl, AsyncStorage, NativeModules, Platform} from 'react-native'
import Rx from 'rxjs'
import PubSub from 'pubsub-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/hotDiaryAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Footer from '../component/Footer'
import ShareModal from '../widget/ShareModal'
import theme from '../config/theme'


class HotDiary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shareVisible: false, // 显示分享
      wechatMetadata: null
    }
  }
  componentDidMount () {
    NativeModules.TCAgent.track('足印', '热门')
    this.props.actions.hotDiaryInit(0)
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
  }

  onRefresh = () => {
    NativeModules.TCAgent.track('足印', '热门')
    this.props.actions.hotDiaryInit(0)
  }

  getItemSeparator = () => <ListSeparator />

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return (<DiaryItem item={item}
      navigation={navigation}
      hasComment
      showUserInfo
      come4="热门"
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
          this.props.actions.hotDiaryLoadingMore(page)
        }
      )
    }
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
        this.props.actions.hotDiaryLike({diaryId, ownerId, index})
      }
    })
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
      description: item.content,
      thumbImage: item.user.avtar === '' ? 'http://qycdn.zhuoyoutech.com/h5share/android/user.png' : item.user.avtar
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
          come4="日记分享"
        />
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          ItemSeparatorComponent={this.getItemSeparator}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          ListFooterComponent={this.getFooterCompt}
          removeClippedSubviews={Platform.OS === 'android'}
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
