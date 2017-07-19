import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PubSub from 'pubsub-js'
import theme from '../config/theme'
import ListSeparator from '../component/ListSeparator'
import CommentItem from '../component/item/CommentItem'
import {View, Text, TouchableOpacity, Image, FlatList, RefreshControl, AsyncStorage} from 'react-native'
import * as actions from '../actions/topic'
import CommentBar from '../component/CommentBar'

import EmptyView from '../component/CommentEmptyView'
import Separator from '../component/Separator'
// homefragment/init/data
class Topic extends PureComponent {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerLeft: <TouchableOpacity onPress={() => navigation.state.params.back()}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })
  componentDidMount () {
    const {topicId, ownerId, diaryId} = this.props.navigation.state.params
    this.props.topicInit({topicId, ownerId, diaryId})
    PubSub.subscribe('refreshDetailPage', this.onRefresh)
    PubSub.subscribe('commentsLikeRefresh', this.onRefresh)
    this.props.navigation.setParams({
      back: this._goBack
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe('refreshDetailPage')
    PubSub.unsubscribe('commentsLikeRefresh')
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
        this.props.topicFollow(id)
      }
      this.props.topicUnfollow(id)
    })
  }
  _onPressLike = (diaryId, ownerId, myLike) => {
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
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'topic'})
      } else {
        this.props.navigation.navigate('CommentEditPage', {com4: 'topic', diaryId: topic.diary_id, ownerId: topic.user_id, type: 'topic'})
      }
    })
  }
  _onPressCommentItem = (item) => {
    this.props.navigation.navigate('CommentsListPage', {com4: 'comment', item})
  }
  _onPressCommentLike = ({diaryId, ownerId, commentId, index, myLike}) => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'topic'})
      } else if (!myLike) {
        this.props.topicCommentLike({diaryId, ownerId, commentId, index})
      }
    })
  }
  renderHeader = (topic, comments) => {
    console.log({focus: topic.my_focus})
    const {topicId} = this.props.navigation.state.params
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{topic.name}</Text>
            <TouchableOpacity onPress={() => this._onPressFollow(topic.my_focus, topicId)}>
              <View style={styles.follow}>
                <Text style={styles.followText}>{topic.my_focus ? '取消关注' : '关注'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.counts}>{topic.comment.num}评论 | {topic.like.num}赞</Text>
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
  render () {
    const {topic, comments, isRefreshing} = this.props;
    console.log({topic})
    return (
      <View style={styles.container}>
        {topic && topic.name && <FlatList
          data={comments}
          renderItem={({item, index}) => (
            <CommentItem data={item}
              navigation={this.props.navigation}
              index={index}
              onPressCommentItem={() => { this._onPressCommentItem(item) }}
              onPressLike={this._onPressCommentLike}/>)}
          removeClippedSubviews={false}
          ListHeaderComponent={() => this.renderHeader(topic, comments)}
          ItemSeparatorComponent={() => <ListSeparator/>}
          onEndReached={() => this.handleLoadingMore()}
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
          likeAction={() => this._onPressLike(topic.diary_id, topic.user_id, topic.my_like)}
          likeNum={topic.like.num}
          commentAction={() => this._onPressComment(topic)}
          commentsNum={topic.comment.num}/>}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    color: '#7d7d7d',
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

const mapDispatchToProps = dispatch => (bindActionCreators(actions, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
