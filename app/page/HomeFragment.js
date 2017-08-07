import React, {Component} from 'react'
import {View, Image, TouchableOpacity, AsyncStorage, StyleSheet, FlatList, RefreshControl, NativeModules} from 'react-native'
import Rx from 'rxjs'
import PubSub from 'pubsub-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/homeActions'
import theme from '../config/theme'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'
import Mine from '../img/mine.png'
import Search from '../img/search.png'
import Pen from '../img/pen.png'
import Footer from '../component/Footer'
import Reminder from '../component/Reminder'
import defaultDiary from '../constant/defaultDiary.json'
import EmptyView from '../component/EmptyPageView'

class HomeFragment extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '浅言',
    headerStyle: {elevation: 0.3, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity style={{width: 40, height: 40, marginRight: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
      onPress={() => navigation.state.params.routerSearch()}>
      <Image source={Search} style={styles.search} />
    </TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
      onPress={() => navigation.state.params.routerMine()}>
      <Image source={Mine} style={styles.profile} />
      {navigation.state.params && navigation.state.params.showReminder && <View style={{height: 15, marginLeft: 2}}>
        <Reminder />
      </View>}
    </TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentWillMount () {
    AsyncStorage.getItem('showHomeReminder').then((result) => {
      if (result === null) {
        this.props.navigation.setParams({
          showReminder: true
        })
      } else {
        this.props.navigation.setParams({
          showReminder: false
        })
      }
    })
  }

  componentDidMount () {
    NativeModules.TCAgent.track('浅记', '浅记')
    this.initData()
    this.props.navigation.setParams({
      routerMine: this._onRouterMine,
      routerSearch: this._onRouterSearch
    })
    PubSub.subscribe('refreshDiaryList', this.onRefresh)
    PubSub.subscribe('loginRefresh', this.onRefresh)
  }


  onRefresh = () => {
    NativeModules.TCAgent.track('浅记', '浅记')
    this.initData()
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

  initData = () => {
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.actions.visitor()
      } else {
        this.props.actions.homeInit(0)
      }
    })
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
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('SearchPage', {message: '搜索'})
      }
    })
    NativeModules.TCAgent.track('浅记', '搜索')
  }

  _onRouterWrite = () => {
    NativeModules.TCAgent.track('浅记', '写日记')
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'profile'})
      } else {
        this.props.navigation.navigate('WriteDiaryPage', {diary: null, come4: 'write'})
      }
    })
  }

  _onRouterMine = () => {
    NativeModules.TCAgent.track('浅记', '个人中心')
    if (this.props.navigation.state.params.showReminder) {
      AsyncStorage.setItem('showHomeReminder', 'true')
      this.props.navigation.setParams({
        showReminder: false
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

  getHeaderCompt = () => {
    const {diarys, isRefreshing, isLogin, loadingSuccess} = this.props
    if (!isRefreshing && loadingSuccess && diarys.length === 0 && isLogin) {
      return <EmptyView come4="diary" message="这个人很懒，什么都没留下~~" />
    }
    return <View />
  }

  render () {
    const {diarys, isRefreshing, isLogin} = this.props
    console.warn('HomeFragment isRefreshing', isRefreshing)
    return (
      <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <FlatList
          style={{flex: 1}}
          data={isLogin ? diarys : defaultDiary}
          ref='_homefragmentlist'
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.getItemSeparator}
          ListFooterComponent={this.getFooterCompt}
          ListHeaderComponent={this.getHeaderCompt}
          onEndReachedThreshold={0.1}
          initialNumToRender={6}
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
    isLogin: homePage.isLogin,
    loadingSuccess: homePage.loadingSuccess,
    common
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const styles = StyleSheet.create({
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
