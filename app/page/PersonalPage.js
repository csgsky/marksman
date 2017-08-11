import React, {PureComponent} from 'react'
import {View, FlatList, RefreshControl, TouchableOpacity, Image, AsyncStorage, Platform} from 'react-native'
// import * as actions from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import * as actions from '../actions/personAction'
import DiaryItem from '../component/item/DiaryItem'
import PersonalInfoView from '../component/PersonalInfo'
import ListSeparator from '../component/ListSeparator'
import CustomButton from '../component/Button'
import Footer from '../component/Footer'
import ShareModal from '../widget/ShareModal'
import theme from '../config/theme'

class PersonalPage extends PureComponent {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff', borderBottomColor: '#fff', borderBottomWidth: 0, shadowColor: '#fff'},
    headerRight: !navigation.state.params.me ? <CustomButton title="关注" onPress={navigation.state.params.onPressFollow} myFocus={navigation.state.params.myFocus}/> : <View/>,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => {navigation.goBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })

  constructor (props) {
    super(props)
    this.state = {
      shareVisible: false, // 显示分享
      wechatMetadata: null
    }
  }
  componentWillMount() {
    console.log('component will mount')
  }

  componentDidMount () {
    console.log('componentDidMount', this.props.navigation.state.params.id)
    const {isRefreshing} = this.props;
    if (!isRefreshing) {
      this.props.actions.personInit(this.props.navigation.state.params.id)
    }
    PubSub.subscribe('refreshDetailPage', (msg) => {
      console.log('personal page', msg)
      this.onRefresh()
    })
    PubSub.subscribe('commentsLikeRefresh', (msg) => {
      console.log('personal page', msg)
      this.onRefresh()
    })
    this.props.navigation.setParams({
      onPressFollow: this._onPressFollow,
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('component will receive props')
    const oldMyFocus = this.props.info.my_focus;
    const myFocus = nextProps.info.my_focus;
    if (oldMyFocus !== myFocus) {
      this.props.navigation.setParams({
        myFocus
      })
    }
  }

  render () {
    const {info, diaries, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
        <ShareModal
          visible={this.state.shareVisible}
          hideShare={this.hideShare}
          wechatMetadata={this.state.wechatMetadata}
        />
        {diaries && info && <FlatList
          data={diaries}
          renderItem={this.getItemCompt}
          removeClippedSubviews={Platform.OS === 'android'}
          ItemSeparatorComponent={() => <ListSeparator/>}
          ListHeaderComponent={() => <PersonalInfoView info={info} diaries={diaries}/>}
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
      </View>
    )
  }

  componentWillUnmount() {
    console.log('component will unmount')
    PubSub.unsubscribe('refreshDetailPage')
    PubSub.unsubscribe('commentsLikeRefresh')
    // this.props.actions.clearPersonData()
  }

  onRefresh = () => {
    const {isRefreshing} = this.props;
    if (!isRefreshing) {
      this.props.actions.personInit(this.props.navigation.state.params.id)
    }
  }

  getItemCompt = ({item, index}) => {
    return (<DiaryItem item={item}
      navigation={this.props.navigation}
      hasComment
      showUserInfo
      come4="个人主页"
      showShare={() => this.showShare(index, item)}
      likeDiary={this._likeDiary}
      index={index}/>)
  }

  getFooterCompt = () => {
    const {diaries, hasMore} = this.props
    if (diaries.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }

  hideShare = () => {
    this.setState({
      shareVisible: false
    })
  }

  showShare = (index, item) => {
    // 准备 分享数据
    const wechatMetadata = this.getWechatShareMeta(index, item)
    this.setState({
      shareVisible: true,
      wechatMetadata
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

  _likeDiary = (diaryId, ownerId, myLike, index) => {
    if (myLike) {
      return
    }
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'personalPage'})
      } else {
        this.props.actions.personDiaryLike({diaryId, ownerId, index})
      }
    })
  }
  _onPressFollow = () => {
    const {info} = this.props;
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'personalPage'})
      } else {
        this.props.actions.personFollow({userId: info.user_id, myFocus: info.my_focus})
      }
    })
  }
  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.personDiaryMore(page, this.props.navigation.state.params.id)
    }
  }
}

const mapStateToProps = (state) => {
  const {personalData: {info, diaries, isRefreshing, isLoadingMore, hasMore, page}} = state
  return {
    info,
    diaries,
    isRefreshing,
    isLoadingMore,
    hasMore,
    page
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)
