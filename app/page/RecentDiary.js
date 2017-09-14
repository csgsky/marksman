import React, {Component} from 'react'
import {View, FlatList, RefreshControl, AsyncStorage, NativeModules, Platform} from 'react-native'
import Rx from 'rxjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/recentDiaryAction'
import * as reportActions from '../actions/reportAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Footer from '../component/Footer'
import ShareModal from '../widget/ShareModal'
import theme from '../config/theme'
import Reporter from '../widget/ReportModal'
import CheckReport from '../widget/CheckReportModal'

class RecentDiary extends Component {

  constructor (props) {
    super(props)
    const timeStap = new Date().getTime()
    this.state = {
      shareVisible: false, // 显示分享
      reportVisible: false,
      reportedUserId: 0,
      checkReportVisible: false,
      wechatMetadata: null,
      timeStap
    }
  }

  componentDidMount () {
    NativeModules.TCAgent.track('足印', '最新')
    this.props.actions.recentDiaryInit(0, this.state.timeStap)
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
    PubSub.subscribe('refreshDiaryListLike', (msg, diaryId) => {
      this.props.actions.updateDiaryLike(diaryId)
    })
    PubSub.subscribe('refreshDiaryListComment', (msg, diaryId) => {
      this.props.actions.updateDiaryComment(diaryId)
    })
  }

  onRefresh = () => {
    NativeModules.TCAgent.track('足印', '最新')
    const timeStap = new Date().getTime();
    this.setState({
      timeStap
    })
    this.props.actions.recentDiaryInit(0, timeStap)
  }

  _likeDiary = (diaryId, ownerId, myLike, index) => {
    const {isLiking} = this.props;
    if (isLiking || myLike) {
      return
    }
    NativeModules.TCAgent.track('足印', '点赞')
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
      showReport={() => this.showReport(item)}
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
      Rx.Observable.of('refresh').delay(200).subscribe(
        (it) => {
          // todo
          this.props.actions.recentDiaryLoadingMore(page, this.state.timeStap)
        }
      )
    }
  }

  hideShare = () => {
    this.setState({
      shareVisible: false
    })
  }

  hideReport = () => {
    this.setState({
      reportVisible: false
    })
  }

  showReport = (item) => {
    const id = item.user ? item.user.user_id : 0
    this.setState({
      reportVisible: true,
      reportedUserId: id
    })
  }

  showCheckReporter = () => {
    this.setState({
      checkReportVisible: true
    })
  }

  hideCheckReport = () => {
    this.setState({
      checkReportVisible: false
    })
  }

  report = () => {
    this.setState({
      reportVisible: false
    })
    this.showCheckReporter()
  }

  confirmReport = (index) => {
    this.hideCheckReport()
    this.props.actions.reportInit({obj_type: 0, obj_id: this.state.reportedUserId, type: index})
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
        <Reporter
          visible={this.state.reportVisible}
          hideReport={this.hideReport}
          report={this.report}
          />
        <CheckReport
          visible={this.state.checkReportVisible}
          hideCheckReport={this.hideCheckReport}
          confirmReport={this.confirmReport}
        />
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          ItemSeparatorComponent={this.getItemSeparator}
          ListFooterComponent={this.getFooterCompt}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
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
  const {recentDiary} = state
  return {
    isRefreshing: recentDiary.isRefreshing,
    diarys: recentDiary.diarys,
    hasMoreData: recentDiary.hasMoreData,
    isLoadingMore: recentDiary.isLoadingMore,
    page: recentDiary.page,
    isLiking: recentDiary.isLiking
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...actions, ...reportActions}, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RecentDiary)

