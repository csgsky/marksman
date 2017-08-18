import React, {PureComponent} from 'react'
import {View, FlatList, RefreshControl, Platform, TextInput, Image, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PubSub from 'pubsub-js'
import PageBack from '../img/page_back.png'
import * as actions from '../actions/commentListActions'
import dismissKeyboard from 'dismissKeyboard'
import {commentPost, clearCommentPost} from '../actions/commentEditorAction'
import theme from '../config/theme'
import CommentItem from '../component/item/CommentItem'
import ListSeparator from '../component/ListSeparator'
import AutoInputText from '../widget/AutoGrowingTextInput'

class CommentListPage extends PureComponent {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    title: navigation.state.params.title || ' ',
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18},
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={PageBack} /></TouchableOpacity>,
  })
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      recvName: '',
      diaryId: undefined,
      commentId: undefined,
      diaryOwnerId: undefined,
      commentOwnerId: undefined,
      pid: undefined
    }
  }
  componentWillMount() {
    const mainComment = this.props.navigation.state.params.item
    console.log({mainComment})
    this.setState({
      diaryId: mainComment.diary_id,
      commentOwnerId: mainComment.user_id,
      diaryOwnerId: mainComment.owner_id,
      commentId: mainComment.comment_id,
      recvName: mainComment.nickname,
      pid: mainComment.user_id
    })
  }
  componentDidMount() {
    const {diaryId, diaryOwnerId, commentId} = this.state;
    const mainComment = this.props.navigation.state.params.item
    this.props.commentsListInit({diaryId, ownerId: diaryOwnerId, commentId, mainComment})
    PubSub.subscribe('commentsListRefresh', () => this.props.commentsListInit({diaryId, ownerId: diaryOwnerId, commentId, mainComment}))
  }
  componentWillReceiveProps(nextProps) {
    const {count} = this.props;
    const newCount = nextProps.count;
    if (count !== newCount && !isNaN(newCount)) {
      this.props.navigation.setParams({title: `${newCount}条回复`})
    }
  }
  componentWillUnmount() {
    this.props.clearCommentsList()
    PubSub.unsubscribe('commentsListRefresh')
  }
  onRefresh = () => {
    const {diaryId, diaryOwnerId, commentId} = this.state;
    const {isRefreshing} = this.props;
    console.log('refreshing', {diaryId, ownerId: diaryOwnerId, commentId, isRefreshing})
    if (isRefreshing) {
      return
    }
    const mainComment = this.props.navigation.state.params.item
    this.props.commentsListInit({diaryId, ownerId: diaryOwnerId, commentId, mainComment})
  }
  handleLoadingMore = () => {
    const {hasMore, isLoadingMore, page} = this.props;
    if (hasMore && !isLoadingMore) {
      const {diaryId, diaryOwnerId, commentId} = this.state;
      this.props.commentsListMore({diaryId, ownerId: diaryOwnerId, commentId, page: page + 1})
    }
  }
  _onPressCommentItem = (item) => {
    const {isPostingComment} = this.props;
    if (isPostingComment) {
      return
    }
    this.setState({recvName: item.nickname, pid: item.user_id, commentOwnerId: item.user_id})
  }
  _onPressCommentLike = ({diaryId, ownerId, commentId, index, myLike}) => {
    const {isLiking} = this.props;
    if (isLiking) {
      return
    }
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'commentsList'})
      } else if (!myLike) {
        this.props.commentsListLike({diaryId, ownerId, commentId, index})
      }
    })
  }
  _onSubmit = () => {
    const {diaryId, commentOwnerId, commentId, comment, pid} = this.state
    this.setState({
      comment: ''
    })
    console.log({diaryId, commentOwnerId, commentId, comment, pid})
    dismissKeyboard()
    if (!comment) {
      return
    }
    const data = {
      content: comment,
    }
    if (pid) {
      data.pid = pid
    }
    this.props.commentsListCommentPost({diaryId, ownerId: commentOwnerId, commentId, data})
  }
  render() {
    const {comments, navigation, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          {comments && <FlatList style={{flex: 1}}
            data={comments}
            renderItem={({item, index}) =>
              (<CommentItem
                data={item}
                index={index}
                navigation={navigation}
                type="commentsList"
                onPressLike={this._onPressCommentLike}
                onPressCommentItem={() => this._onPressCommentItem(item)}/>)}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.handleLoadingMore()}
            removeClippedSubviews={Platform.OS === 'android'}
            ItemSeparatorComponent={() => <ListSeparator/>}
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                color="#ccc"
                refreshing={isRefreshing}
              />
            }
        />}
        </View>
        {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-64}>
          <View style={{borderTopWidth: 1, borderColor: theme.border.color, alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff'}}>
            <AutoInputText style={styles.input}
              onChangeText={(text) => { this.setState({comment: text}) }}
              multiline
              underlineColorAndroid="transparent"
              value={this.state.comment}
              placeholderTextColor="#a3a3a3"
              placeholder={`回复@${this.state.recvName}：`}/>
            <TouchableOpacity onPress={() => this._onSubmit()}>
              <Text style={styles.submit}>发送</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>}
        {Platform.OS === 'android' && <View style={{borderTopWidth: 1, borderColor: theme.border.color, alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff'}}>
          <AutoInputText style={styles.input}
            onChangeText={(text) => { this.setState({comment: text}) }}
            multiline
            underlineColorAndroid="transparent"
            value={this.state.comment}
            placeholderTextColor="#a3a3a3"
            placeholder={`回复@${this.state.recvName}：`}/>
          <TouchableOpacity onPress={() => this._onSubmit()}>
            <Text style={styles.submit}>发送</Text>
          </TouchableOpacity>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    minHeight: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#a3a3a3',
    fontSize: 14,
    borderWidth: 1,
    borderColor: theme.border.color,
    borderRadius: 4,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  submit: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: theme.text.xxlgFontSize
  }
})

export default connect(({commentsList}) => commentsList, dispatch => bindActionCreators({...actions, clearCommentPost}, dispatch))(CommentListPage)
