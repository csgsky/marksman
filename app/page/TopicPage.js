import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, Image, FlatList, RefreshControl, AsyncStorage, NativeModules, Platform} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PubSub from 'pubsub-js'
import theme from '../config/theme'
import ListSeparator from '../component/ListSeparator'
import CommentItem from '../component/item/CommentItem'
import * as actions from '../actions/topic'
import * as reportActions from '../actions/reportAction'
import CommentBar from '../component/CommentBar'
import ShareModal from '../widget/ShareModal'
import EmptyView from '../component/CommentEmptyView'
import Separator from '../component/Separator'
import Footer from '../component/Footer'
import Reporter from '../widget/ReportModal'
import CheckReport from '../widget/CheckReportModal'

class Topic extends PureComponent {
  static navigationOptions = ({navigation}) => ({
    title: '话题',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    gesturesEnabled: false,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      shareVisible: false, // 显示分享
      reportVisible: false,
      reportedUserId: 0,
      checkReportVisible: false,
      wechatMetadata: null
    }
  }
  componentDidMount () {
    NativeModules.TCAgent.trackSingle('进入话题详情')
    const {topicId, ownerId, diaryId} = this.props.navigation.state.params
    this.props.topicInit({topicId, ownerId, diaryId})
    PubSub.subscribe('refreshDetailPage', this.onRefresh)
    PubSub.subscribe('commentsLikeRefresh', this.onRefresh)
    PubSub.subscribe('commentsRefresh', this.onRefresh)
    PubSub.subscribe('commentsListRefresh', this.onRefresh)
    this.props.navigation.setParams({
      back: this._goBack
    })
  }
  componentWillUnmount() {
    this.props.clearData()
    PubSub.unsubscribe('refreshDetailPage')
    PubSub.unsubscribe('commentsLikeRefresh')
    PubSub.unsubscribe('commentsRefresh')
    PubSub.unsubscribe('commentsListRefresh')
  }
  onRefresh = () => {
    const {topicId, ownerId, diaryId} = this.props.navigation.state.params
    this.props.topicInit({topicId, ownerId, diaryId})
  }
  _goBack = () => {
    // PubSub.publish('homefragment/init/data')
    this.props.navigation.goBack()
  }
  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    const {ownerId, diaryId} = this.props.navigation.state.params
    if (!isLoadingMore && hasMore) {
      this.props.topicCommentsLoadMore({diaryId, ownerId, page})
    }
  }
  _onPressFollow = (focused, id) => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'topic'})
      } else if (!focused) {
        NativeModules.TCAgent.trackSingle('话题-关注')
        this.props.topicFollow(id)
      } else {
        NativeModules.TCAgent.trackSingle('话题-取消关注')
        this.props.topicUnfollow(id)
      }
    })
  }
  _onPressLike = (diaryId, ownerId, myLike, isLikingTopic) => {
    if (isLikingTopic) {
      return
    }
    NativeModules.TCAgent.trackSingle('话题点赞')
    if (!myLike) {
      AsyncStorage.getItem('userId').then((result) => {
        if (result === null) {
          this.props.navigation.navigate('Login', {come4: 'topic'})
        } else {
          this.props.topicLike({diaryId, ownerId})
        }
      })
    }
  }
  _onPressComment = (topic) => {
    NativeModules.TCAgent.track('发现', '日记详情页-评论')
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: '话题'})
      } else {
        this.props.navigation.navigate('CommentEditPage', {come4: '话题', diaryId: topic.diary_id, ownerId: topic.user_id, type: 'topic'})
      }
    })
  }
  _onPressCommentItem = (item) => {
    setTimeout(() => {
      this.props.navigation.navigate('CommentsListPage', {come4: '话题', item})
    }, 300)
  }
  _onPressCommentLike = ({diaryId, ownerId, commentId, index, myLike}) => {
    const {isLikingComment} = this.props;
    if (isLikingComment) {
      return
    }
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'topic'})
      } else if (!myLike) {
        this.props.topicCommentLike({diaryId, ownerId, commentId, index})
      }
    })
  }
  renderHeader = (topic, comments) => {
    const {topicId} = this.props.navigation.state.params
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{topic.name}</Text>
            <TouchableOpacity onPress={() => this._onPressFollow(topic.my_focus, topicId)}>
              <View style={styles.follow}>
                <Text style={styles.followText}>{topic.my_focus ? '取消关注' : '关注'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.counts}>{topic.views}浏览 | {topic.comment.num}评论</Text>
          <Text style={styles.content}>{topic.content}</Text>
          <View style={[styles.tag, {backgroundColor: topic.tag_color}]}>
            <Text style={styles.tagText}>{topic.tag}</Text>
          </View>
        </View>
        <Separator />
        {comments && comments.length === 0 && <EmptyView message={'快来发表你的评论吧~'}/>}
      </View>
    )
  }

  getFooterCompt = () => {
    const {comments, hasMore} = this.props
    if (comments.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }


  getWechatShareMeta = () => {
    const {topic} = this.props
    return {
      type: 'news',
      webpageUrl: `http://qycdn.zhuoyoutech.com/h5/talk.html?talk_id=${topic.talk_id}`,
      title: topic.name,
      description: topic.content,
      thumbImage: topic.icon_url
    }
  }

  hideShare = () => {
    this.setState({
      shareVisible: false
    })
  }

  showShare = () => {
    NativeModules.TCAgent.track('发现', '日记详情页-分享')
    const wechatMetadata = this.getWechatShareMeta()
    this.setState({
      shareVisible: true,
      wechatMetadata
    })
  }

  hideReport = () => {
    this.setState({
      reportVisible: false
    })
  }

  showReport = (item) => {
    const id = item.user_id ? item.user_id : 0
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
    this.props.reportInit({obj_type: 1, obj_id: this.state.reportedUserId, type: index})
  }

  render () {
    const {topic, comments, isRefreshing, isLikingTopic, isLikingComment} = this.props;
    return (
      <View style={styles.container}>
        <ShareModal
          visible={this.state.shareVisible}
          hideShare={this.hideShare}
          wechatMetadata={this.state.wechatMetadata}
          come4="话题分享"
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
        {topic && topic.name && <FlatList
          data={comments}
          renderItem={({item, index}) => (
            <CommentItem data={item}
              navigation={this.props.navigation}
              index={index}
              isLikingComment={isLikingComment}
              showReport={() => this.showReport(item)}
              onPressCommentItem={() => { this._onPressCommentItem(item) }}
              onPressLike={this._onPressCommentLike}/>)}
          removeClippedSubviews={Platform.OS === 'android'}
          ListHeaderComponent={() => this.renderHeader(topic, comments)}
          ItemSeparatorComponent={() => <ListSeparator/>}
          onEndReached={() => this.handleLoadingMore()}
          ListFooterComponent={this.getFooterCompt}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              color="#ccc"
              refreshing={isRefreshing}
            />
          }
        />}
        {topic && <CommentBar
          myLike={topic.my_like}
          likeAction={() => this._onPressLike(topic.diary_id, topic.user_id, topic.my_like, isLikingTopic)}
          likeNum={topic.like.num}
          showShare={this.showShare}
          commentAction={() => this._onPressComment(topic)}
          commentsNum={topic.comment.num}/>}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  header: {
    padding: 16,
    paddingBottom: 0
  },
  counts: {
    color: '#9b9b9b',
    fontSize: theme.text.smFontSize,
    marginTop: 5
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    fontSize: theme.text.xlgFontSize,
    color: '#4a4a4a',
    flex: 1
  },
  content: {
    fontSize: theme.text.xlgFontSize,
    color: '#afaa91',
    lineHeight: 25,
    paddingTop: 13,
    paddingBottom: 13
  },
  follow: {
    width: 75,
    height: 25,
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: 'rgba(133, 179, 104, 0.57)'
  },
  followText: {
    fontSize: theme.text.mdFontSize,
    textAlign: 'center',
    color: '#fff',
  },
  tag: {
    borderRadius: 2,
    width: 58,
    justifyContent: 'center',
    height: 18,
    backgroundColor: 'rgba(245,165,35,0.52)',
    marginBottom: 12
  },
  tagText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: theme.text.mdFontSize,
  }
}

const mapStateToProps = ({topic}) => topic

const mapDispatchToProps = dispatch => (bindActionCreators({...actions, ...reportActions}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
