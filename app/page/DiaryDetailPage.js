import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, RefreshControl, StyleSheet, Platform, NativeModules, FlatList, AsyncStorage, Alert} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/diaryDetailAction'
import theme from '../config/theme'
import CommentItem from '../component/item/CommentItem'
import ListSeparator from '../component/ListSeparator'
import DiaryItem from '../component/item/DiaryItem'
import DefaultUserAvatar from '../img/default_vatar.png'
import CommentBar from '../component/CommentBar'
import EmptyView from '../component/CommentEmptyView'
import Separator from '../component/Separator'
import Delete from '../img/diary_delete.png'
import Edit from '../img/diary_edit.png'
import ShareModal from '../widget/ShareModal'

class DiaryDetailPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: navigation.state.params.me ? <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.state.params.deleteDiary && navigation.state.params.deleteDiary()}>
        <Image style={{width: 18, height: 18}} source={Delete}/>
      </TouchableOpacity>
      <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.state.params.editDiary && navigation.state.params.editDiary()}>
        <Image style={{width: 16, height: 16}} source={Edit}/>
      </TouchableOpacity>
    </View>
      : <TouchableOpacity style={{flexDirection: 'row', marginRight: 16}}
        onPress={() => navigation.state.params.routerToPersonalPage(navigation.state.params.item.user.user_id)}>
        <Text style={{alignSelf: 'center', fontSize: 14, marginRight: 11}}>{navigation.state.params.item.user.nickname}</Text>
        <Image style={{width: 26, height: 26, borderRadius: 13}}
          source={navigation.state.params.item.user.avtar === '' ? DefaultUserAvatar : {uri: navigation.state.params.item.user.avtar}}/>
      </TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}>
      <Image resizeMode="contain"
        style={{width: 18, height: 18, marginLeft: 16}}
        source={theme.imgs.PageBack} />
    </TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor(props) {
    super(props)
    this.state = {
      diary: undefined,
      shareVisible: false, // 显示分享
      wechatMetadata: null
    }
  }

  componentWillMount() {
    this.setState({
      diary: this.props.navigation.state.params.item,
      com4: this.props.navigation.state.params.com4
    })
  }

  componentDidMount () {
    NativeModules.TCAgent.track('日记详情页', '日记详情')
    const id = this.state.diary.diary_id
    const ownerId = this.state.diary.user_id
    this.props.diaryCommentInit({id, ownerId})
    PubSub.subscribe('refreshDetailPage', (msg) => {
      console.log('pubsub', msg)
      this.props.diaryCommentInit({id, ownerId});
    })
    PubSub.subscribe('commentsLikeRefresh', (msg) => {
      console.log('pubsub', msg)
      this.props.diaryCommentInit({id, ownerId})
    })
    PubSub.subscribe('commentsRefresh', (msg) => {
      console.log('pubsub', msg)
      this.props.diaryCommentInit({id, ownerId})
    })
    PubSub.subscribe('commentsListRefresh', (msg) => {
      console.log('pubsub', msg)
      this.props.diaryCommentInit({id, ownerId})
    })
    // 跳转到个人主页
    this.props.navigation.setParams({
      routerToPersonalPage: this.routerToPersonalPage,
      deleteDiary: this.deleteDiary,
      editDiary: this.editDiary
    })
  }

  componentWillReceiveProps(nextProps) {
    const {likeSuccess, commentSuccess, deleteSuccess} = this.props;
    const newLikeSuccess = nextProps.likeSuccess;
    const newCommentSuccess = nextProps.commentSuccess;
    const newDeleteSuccess = nextProps.deleteSuccess;
    console.log({likeSuccess, newLikeSuccess})
    if (likeSuccess !== newLikeSuccess && newLikeSuccess) {
      this.setState({
        diary: {...this.state.diary, my_like: 1, like: {num: this.state.diary.like.num + 1}}
      })
    }
    if (commentSuccess !== newCommentSuccess && newCommentSuccess) {
      this.setState({
        diary: {...this.state.diary, comment: {num: this.state.diary.comment.num + 1}}
      })
    }
    if (deleteSuccess !== newDeleteSuccess && newDeleteSuccess) {
      PubSub.publish('refreshDiaryList')
      this.props.navigation.goBack()
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe('refreshDetailPage')
    PubSub.unsubscribe('commentsLikeRefresh')
    PubSub.unsubscribe('commentsRefresh')
    PubSub.unsubscribe('commentsListRefresh')
    this.props.clearDiary()
  }

  onRefresh = () => {
    const id = this.state.diary.diary_id
    const ownerId = this.state.diary.user_id
    this.props.diaryCommentInit({id, ownerId})
  }

  getHeaderView = () => {
    const {comments} = this.props
    return (<View style={{flexDirection: 'column'}}>
      <DiaryItem
        item={this.state.diary}
        hasComment={false}
        isDetail
        navigation={this.props.navigation}
        showStamp />
      <Separator />
      {comments && comments.length === 0 && <EmptyView message={'快来发表你的评论吧~'}/>}
    </View>)
  }

  deleteDiary = () => {
    NativeModules.TCAgent.track('日记详情页', '删除日记')
    const payload = {diarys: [{diary_id: this.state.diary.diary_id}], mode: 0}
    Alert.alert(
      '提示',
      '日记删除后，30天内可在垃圾箱恢复日记，是否确认删除？',
      [
        {text: '取消'},
        {text: '确定', onPress: () => this.props.deleteDiary(payload)}
      ],
      { cancelable: false }
    )
  }

  editDiary = () => {
    NativeModules.TCAgent.track('日记详情页', '编辑')
    this.props.navigation.navigate('WriteDiaryPage', {diary: this.state.diary, come4: 'edit'})
  }


  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    const id = this.state.diary.diary_id
    const ownerId = this.state.diary.user_id
    if (!isLoadingMore && hasMore) {
      this.props.diaryCommentsLoadMore({id, ownerId, page})
    }
  }

  _onPressLike = (diaryId, ownerId, myLike) => {
    NativeModules.TCAgent.track('日记详情页', '点赞')
    if (!myLike) {
      AsyncStorage.getItem('userId').then((result) => {
        if (result === null) {
          this.props.navigation.navigate('Login', {come4: 'diary'})
        } else {
          this.props.diaryLike({id: diaryId, ownerId})
        }
      })
    }
  }

  _onPressComment = (diary) => {
    NativeModules.TCAgent.track('日记详情页', '评论')
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'diary'})
      } else {
        this.props.navigation.navigate('CommentEditPage', {com4: 'diary', diaryId: diary.diary_id, ownerId: diary.user_id, nickname: diary.user.nickname, type: 'diary'})
      }
    })
  }

  _onPressCommentItem = (item) => {
    this.props.navigation.navigate('CommentsListPage', {com4: 'diary', item})
  }

  _onPressCommentLike = ({diaryId, ownerId, commentId, index, myLike}) => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'diary'})
      } else if (!myLike) {
        this.props.diaryCommentLike({diaryId, ownerId, commentId, index})
      }
    })
  }

  getWechatShareMeta = () => {
    const diary = this.state.diary
    return {
      type: 'news',
      webpageUrl: `http://qycdn.zhuoyoutech.com/h5/diary.html?diary_id=${diary.diary_id}`,
      title: '来自' + diary.user.nickname + '的日记',
      description: diary.content
    }
  }
  routerToPersonalPage = (userId) => {
    this.props.navigation.navigate('PersonalPage', {message: '个人主页', id: userId})
  }
  hideShare = () => {
    this.setState({
      shareVisible: false
    })
  }
  showShare = () => {
    NativeModules.TCAgent.track('日记详情页', '分享')
    const wechatMetadata = this.getWechatShareMeta()
    this.setState({
      shareVisible: true,
      wechatMetadata
    })
  }

  render () {
    const {isRefreshing, comments} = this.props
    const diary = this.state.diary
    console.log(comments)
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ShareModal
          visible={this.state.shareVisible}
          hideShare={this.hideShare}
          wechatMetadata={this.state.wechatMetadata}
        />
        <FlatList
          data={comments}
          renderItem={({item, index}) => (
            <CommentItem data={item}
              navigation={this.props.navigation}
              index={index}
              onPressCommentItem={() => { this._onPressCommentItem(item) }}
              onPressLike={this._onPressCommentLike}/>)}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={Platform.OS === 'android'}
          ListHeaderComponent={this.getHeaderView}
          ItemSeparatorComponent={() => <ListSeparator/>}
          onEndReached={this.handleLoadingMore}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              color="#ccc"
              refreshing={isRefreshing}
            />
          }
        />
        <CommentBar
          myLike={diary.my_like}
          likeAction={() => this._onPressLike(diary.diary_id, diary.user_id, diary.my_like)}
          likeNum={diary.like.num}
          showShare={this.showShare}
          commentAction={() => this._onPressComment(diary)}
          commentsNum={diary.comment.num}/>
      </View>
    )
  }
}


const mapStateToProps = ({diaryDetail}) => diaryDetail

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DiaryDetailPage)
