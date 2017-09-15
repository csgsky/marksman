import React, {Component} from 'react'
import {View, Image, TouchableOpacity, AsyncStorage, Text, StyleSheet, FlatList, RefreshControl, NativeModules, Platform} from 'react-native'
import Rx from 'rxjs'
import PubSub from 'pubsub-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/homeActions'
import * as profileAction from '../actions/profile'
import * as consts from '../utils/const'
import theme from '../config/theme'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Separator from '../component/Separator'
import Mine from '../img/mine.png'
// import Search from '../img/search.png'
import Msg from '../img/msg.png'
// import MsgP from '../img/message_prompt.png'
import Pen from '../img/pen.png'
import Footer from '../component/Footer'
import Reminder from '../component/Reminder'
import defaultDiary from '../constant/defaultDiary.json'
import EmptyView from '../component/EmptyPageView'

class HomeFragment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showLeftReminder: false,
      showRightReminder: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('showHomeReminder').then((result) => {
      if (result === null) {
        this.setState({
          showLeftReminder: true
        })
      } else {
        this.setState({
          showLeftReminder: false
        })
      }
    })
  }

  componentDidMount () {
    NativeModules.TCAgent.track('浅记', '浅记')
    if (Platform.OS === 'android') {
      this.props.actions.checkVersion()
    }
    this.initData()
    this.props.navigation.setParams({
      routerMine: this._onRouterMine,
      routerNews: this._routerNews
    })
    PubSub.subscribe('refreshDiaryList', () => {
      this._homefragmentlist.scrollToOffset({x: 0, y: 0, animated: true})
      this.onRefresh()
    })
    PubSub.subscribe('loginRefresh', this.onRefresh)
  }

  componentWillReceiveProps (nextProps) {
    const newMessage = nextProps.message
    const {message} = this.props
    if (message && newMessage) {
      if (newMessage.mymsg_rd === 1) {
        this.setState({
          showRightReminder: true
        })
      } else if (newMessage.mymsg_rd === 0) {
        this.setState({
          showRightReminder: false
        })
      }
    }
  }

  onRefresh = () => {
    NativeModules.TCAgent.track('浅记', '浅记')
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.actions.visitor()
      } else {
        Rx.Observable.of('delay').delay(1000).subscribe(
          () => {
            this.props.actions.homeInit(0)
          }
        )
      }
    })
  }

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment={false} showStamp isDefault={!this.props.isLogin}/>
  }

  getItemSeparator = () => <ListSeparator />

  getFooterCompt = () => {
    const {diarys, hasMoreData, isLogin} = this.props
    if (diarys.length > 0 && isLogin) {
      return <Footer hasMoreData={hasMoreData}/>
    } else if (!isLogin) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }

  // _routerSearch = () => {
  //   AsyncStorage.getItem('userId').then((result) => {
  //     if (result === null) {
  //       this.props.navigation.navigate('Login', {come4: 'profile'})
  //     } else {
  //       this.props.navigation.navigate('SearchPage', {message: '搜索'})
  //     }
  //   })
  //   NativeModules.TCAgent.track('浅记', '搜索')
  // }

  getHeaderCompt = () => {
    const {diarys, isRefreshing, isLogin, loadingSuccess} = this.props
    if (!isRefreshing && loadingSuccess && diarys.length === 0 && isLogin) {
      return <EmptyView come4="diary" message="这个人很懒，什么都没留下~~" />
    }
    return <View />
  }

  _routerNews = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('NewsCenterPage', {come4: 'profile',
          callback: (hasRed) => {
            if (!hasRed) {
              this.props.actions.dismissPersonalCenterMineMsg()
            }
          }})
      }
    })
  }

  _onRouterWrite = () => {
    NativeModules.TCAgent.track('浅记', '写日记')

    Rx.Observable.zip(
      Rx.Observable.from(AsyncStorage.getItem('userId')),
      Rx.Observable.from(AsyncStorage.getItem(consts.WELCOME)),
      (userId, welcome) => ({userId, welcome: welcome || '今天，你过的好么？'})
    ).subscribe(
      (it) => {
        if (it.userId) {
          this.props.navigation.navigate('WriteDiaryPage', {diary: null, come4: 'write', welcome: it.welcome})
        } else {
          this.props.navigation.navigate('Login', {come4: 'profile'})
        }
      }
    )

    // AsyncStorage.getItem('userId').then((result) => {
    //   if (result === null) {
    //     this.props.navigation.navigate('Login', {come4: 'profile'})
    //   } else {
    //     this.props.navigation.navigate('WriteDiaryPage', {diary: null, come4: 'write'})
    //   }
    // })
  }

  _onRouterMine = () => {
    NativeModules.TCAgent.track('浅记', '个人中心')
    if (this.state.showLeftReminder) {
      AsyncStorage.setItem('showHomeReminder', 'true')
      this.setState({
        showLeftReminder: false
      })
    }

    AsyncStorage.getItem('userId').then((result) => {
      if (result != null) {
        this.props.navigation.navigate('PersonalCenter', {isLogin: true})
      } else {
        this.props.navigation.navigate('PersonalCenter', {isLogin: false})
      }
    })
  }

  hideShare = () => {
    this.setState({
      shareVisible: false
    })
  }

  showShare = () => {
    this.setState({
      shareVisible: true
    })
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore} = this.props
    if (hasMoreData && !isLoadingMore) {
      Rx.Observable.of('refresh').delay(400).subscribe(
        () => {
          this.props.actions.homeLoadingMore(page)
        }
      )
    }
  }

  initData = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.actions.visitor()
      } else {
        this.props.actions.homeInit(0)
        Rx.Observable.timer(0, 1000).subscribe((it) => {
          if (it % 10 === 0) {
            this.props.actions.profileMessageReminder()
          }
        })
      }
    })
  }

  render () {
    const {diarys, isRefreshing, isLogin} = this.props
    return (
      <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        {Platform.OS === 'ios' && <View style={{backgroundColor: '#fff', height: 20}}/>}
        <View style={{height: Platform.OS === 'ios' ? 44 : 56, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
          <TouchableOpacity style={{marginLeft: 16, padding: 2}} onPress={this._onRouterMine}>
            <Image source={Mine} style={styles.profile} />
            {this.state.showLeftReminder && <View style={{position: 'absolute', right: 0, top: 0}}>
              <Reminder />
            </View>}
          </TouchableOpacity>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}}>浅言</Text>
          </View>

          <TouchableOpacity style={{marginRight: 16}} onPress={this._routerNews}>
            <Image source={Msg} style={styles.msg} />
            {this.state.showRightReminder && <View style={{position: 'absolute', right: 0, top: 0}}>
              <Reminder />
            </View>}
          </TouchableOpacity>

        </View>
        <Separator />
        <FlatList
          style={{flex: 1}}
          data={isLogin ? diarys : defaultDiary}
          ref={(homefragmentlist) => { this._homefragmentlist = homefragmentlist }}
          renderItem={this.getItemCompt}
          ItemSeparatorComponent={this.getItemSeparator}
          ListFooterComponent={this.getFooterCompt}
          ListHeaderComponent={this.getHeaderCompt}
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
        <TouchableOpacity style={styles.penView} onPress={this._onRouterWrite}>
          <Image source={Pen} style={styles.pen} />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {homePage, common, profile} = state
  return {
    isRefreshing: homePage.isRefreshing,
    diarys: homePage.diarys,
    hasMoreData: homePage.hasMoreData,
    isLoadingMore: homePage.isLoadingMore,
    page: homePage.page,
    isLogin: homePage.isLogin,
    loadingSuccess: homePage.loadingSuccess,
    common,
    message: profile.message
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...actions, ...profileAction}, dispatch)
})

const styles = StyleSheet.create({
  profile: {
    width: 15,
    height: 15
  },
  msg: {
    width: 19,
    height: 19
  },
  penView: {
    width: 53,
    height: 53,
    position: 'absolute',
    right: 16,
    bottom: 28
  },
  pen: {
    width: 53,
    height: 53
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment)
