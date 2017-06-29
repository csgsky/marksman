import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, RefreshControl, StyleSheet, FlatList, AsyncStorage} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/diaryDetailAction'
import theme from '../config/theme'
import CommentItem from '../component/item/CommentItem'
import ListSeparator from '../component/ListSeparator'
import DiaryItem from '../component/item/DiaryItem'
import PublicStamp from '../img/public_stamp.png'
import PrivateStamp from '../img/private_stamp.png'
import DefaultUserAvatar from '../img/default_vatar.png'
import CommentBar from '../component/CommentBar'


class DiaryDetailPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: navigation.state.params.me ? <View style={{flexDirection: 'row'}}>
      <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
      <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
    </View>
      : <View style={{flexDirection: 'row', marginRight: 16}}>
        <Text style={{alignSelf: 'center', fontSize: 14, marginRight: 11}}>{navigation.state.params.item.nickname}</Text>
        <Image style={{width: 40, height: 40}} resizeMode="contain" source={DefaultUserAvatar}/>
      </View>,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}>
      <Image resizeMode="contain"
        style={{width: 18, height: 18, marginLeft: 16}}
        source={theme.imgs.PageBack} />
    </TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor(props) {
    super(props)
    this.state = {
      diary: undefined
    }
  }

  componentWillMount() {
    this.setState({
      diary: this.props.navigation.state.params.item
    })
  }

  componentDidMount () {
    const id = this.state.diary.diary_id;
    const ownerId = this.state.diary.user_id
    this.props.diaryCommentInit({id, ownerId})
    // PubSub.subscribe('commentsRefresh', this.onRefresh)
    // PubSub.subscribe('commentsLikeRefresh', this.onRefresh)
  }
  componentWillReceiveProps(nextProps) {
    const {likeSuccess} = this.props;
    const newLikeSuccess = nextProps.likeSuccess;
    if (likeSuccess !== newLikeSuccess && newLikeSuccess) {
      this.setState({
        diary: {...this.state.diary, my_like: 1, like: {num: this.state.diary.like.num + 1}}
      })
    }
  }
  onRefresh = () => {
    const id = this.state.diary.diary_id
    const ownerId = this.state.diary.user_id
    this.props.diaryCommentInit({id, ownerId})
  }

  getHeaderView = () =>
    (<View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Image style={styles.stamp} resizeMode="contain" source={this.getDiaryTpye()}/>
      </View>
      <DiaryItem
        item={this.props.navigation.state.params.item}
        hasComment={false}
        showRightTime={false} />
    </View>)

  getDiaryTpye = () => {
    if (this.state.diary.ifprivate === 1) {
      return PublicStamp
    } else if (this.state.diary.ifprivate === 0) {
      return PrivateStamp
    }
    return PrivateStamp
  }

  handleLoadingMore = () => {

  }

  _onPressLike = (diaryId, ownerId, myLike) => {
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
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'diary'})
      } else {
        this.props.navigation.navigate('CommentEditPage', {com4: 'diary', diaryId: diary.diary_id, ownerId: diary.user_id})
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

  render () {
    const {isRefreshing, comments} = this.props
    const diary = this.state.diary
    console.log(comments)
    // console.log('comment render length ===> ' + comments.length)
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={comments}
          renderItem={({item, index}) => (
            <CommentItem data={item}
              navigation={this.props.navigation}
              index={index}
              onPressCommentItem={() => { this._onPressCommentItem(item) }}
              onPressLike={this._onPressCommentLike}/>)}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={this.getHeaderView}
          ItemSeparatorComponent={() => <ListSeparator/>}
          onEndReached={this.handleLoadingMore}
          removeClippedSubviews={false}
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
          commentAction={() => this._onPressComment(diary)}
          commentsNum={diary.comment.num}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stamp: {
    width: 50,
    height: 30,
    marginRight: 20
  }
})

const mapStateToProps = ({diaryDetail}) => diaryDetail

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DiaryDetailPage)
