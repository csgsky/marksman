import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, AsyncStorage, StyleSheet, Platform, FlatList, RefreshControl} from 'react-native'
import Rx from 'rxjs'
import PubSub from 'pubsub-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/homeActions'
import * as consts from '../utils/const'
import theme from '../config/theme'
import Separator from '../component/Separator'
import Toast from 'react-native-root-toast'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Mine from '../img/mine.png'
import Search from '../img/search.png'
import Pen from '../img/pen.png'
import LoadingMore from '../component/LoadingMore'
import NoMoreData from '../component/NoMoreData'

// // 加密使用
// var CryptoJS = require('crypto-js')

// var base64 = require('base-64')
    // var utf8 = require('utf8')
    // var rawStr = '/ZTE/ZTE1.1.3/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null'
    // var words = encodeURIComponent(rawStr)
    // var base64 = base64.encode(words)
    // var hmacSHA1 = CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
    // console.log('hmacSHA1 ==> ' + hmacSHA1)
class HomeFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 测试上传头像问题
      avatarSource: ''
    }
  }
  componentDidMount () {
    this.props.actions.homeInit(0)
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
  }
  componentWillReceiveProps(nextProps) {
    const err = nextProps.common.error;
    if (err) {
      Toast.show(err, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
        // calls on toast\`s appear animation start
        },
        onShown: () => {
        // calls on toast\`s appear animation end.
        },
        onHide: () => {
        // calls on toast\`s hide animation start.
        },
        onHidden: () => {
        // calls on toast\`s hide animation end.
        }
      })
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe('refreshDiaryList')
  }

  onRefresh = () => {
    this.props.actions.homeInit(0)
  }

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment={false} showRightTime />
  }

  getItemSeparator = () => <ListSeparator />

  getFooterCompt = () => {
    const {diarys, hasMoreData, isLoadingMore} = this.props
    if (diarys.length > 0 && hasMoreData && isLoadingMore) {
      return <LoadingMore />
    } else if (diarys.length > 0 && !hasMoreData) {
      return <NoMoreData />
    } else {
      return <View />
    }
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore} = this.props
    if (hasMoreData && !isLoadingMore) {
      Rx.Observable.of('refresh').delay(800).subscribe(
        (it) => {
          this.props.actions.homeLoadingMore(page)
        }
      )
    }
  }

  _onRouterSearch = () => {
    this.props.navigation.navigate('SearchPage', {message: '搜索'})
  }

  _onRouterWrite = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('WriteDiaryPage', {diary: null})
      }
    })
  }

  _onRouterMine = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result != null) {
        this.props.navigation.navigate('PersonalCenter', {isLogin: true})
      } else {
        this.props.navigation.navigate('PersonalCenter', {isLogin: false})
      }
    })
  }

  render () {
    const {diarys, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={{width: 52, height: 52, justifyContent: 'center'}} onPress={this._onRouterMine}>
            <Image source={Mine} style={styles.profile} />
          </TouchableOpacity>
          <View style={styles.titleView}><Text style={styles.title}>{consts.appName}</Text></View>
          <TouchableOpacity style={{width: 52, height: 52, alignItems: 'center', marginTop: 16}} onPress={this._onRouterSearch}>
            <Image source={Search} style={styles.search} />
          </TouchableOpacity>
        </View>
        <Separator />
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.getItemSeparator}
          ListFooterComponent={this.getFooterCompt}
          onEndReachedThreshold={0.1}
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
  const {homePage, common} = state
  return {
    isRefreshing: homePage.isRefreshing,
    diarys: homePage.diarys,
    hasMoreData: homePage.hasMoreData,
    isLoadingMore: homePage.isLoadingMore,
    page: homePage.page,
    common
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    height: 52,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'white'
  },
  titleView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 50,
    color: '#6a6a6a',
    fontSize: 18
  },
  profile: {
    width: 15,
    height: 15,
    marginLeft: 16
  },
  search: {
    width: 18,
    height: 18,
    marginRight: 4
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
