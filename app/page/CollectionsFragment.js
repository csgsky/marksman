import React, {Component} from 'react'
import {View, StyleSheet, FlatList, Platform, RefreshControl, NativeModules, AsyncStorage} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Rx from 'rxjs'
import CollectionItem from '../component/item/CollectionsItem'
import ListSeparator from '../component/ListSeparator'
import * as actions from '../actions/collectionsAction'
import * as consts from '../utils/const'
import Footer from '../component/Footer'
import theme from '../config/theme'
import {splashApi, CommonInfoApi} from '../api/apis'


class MeFragment extends Component {
  static navigationOptions = () => ({
    title: '文集',
    headerStyle: {elevation: 0.3, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <View />,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  componentDidMount () {
    this.props.actions.collectionsInit(0)
    this.getSplashImg()
    this.getCommonInfo()
  }


  onRefresh = () => {
    this.props.actions.collectionsInit(0)
  }

  getSplashImg = () => {
    Rx.Observable.from(AsyncStorage.getItem('token')).subscribe((it) => {
      this._getSplash(it)
    })
  }

  getCommonInfo = () => {
    Rx.Observable.from(AsyncStorage.getItem('token')).subscribe((it) => {
      this._getCommonInfo(it)
    })
  }

  getItemSeparator = () => <ListSeparator />

  getItemCompt = ({item}) => {
    const {navigation} = this.props
    return <CollectionItem item={item} navigation={navigation}/>
  }

  getFooterCompt = () => {
    const {hasMoreData, collections} = this.props
    if (collections.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }

  _getSplash = (token) => {
    Rx.Observable
      .from(splashApi(token))
      .subscribe((it) => {
        if (it.return_code === 1) {
          AsyncStorage.setItem('splashImage', it.img_url)
        }
      })
  }

  _getCommonInfo = (token) => {
    Rx.Observable
    .from(CommonInfoApi(token))
    .subscribe((it) => {
      if (it.return_code === 1) {
        // alert('问候语' + it.welcome)
        AsyncStorage.setItem(consts.WELCOME, it.welcome)
      }
    })
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore} = this.props
    if (hasMoreData && !isLoadingMore) {
      Rx.Observable.of('refresh').delay(100).subscribe(
        (it) => {
          this.props.actions.collectionLoadingMore(page)
        }
      )
    }
  }

  render() {
    const {collections, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
        <FlatList
          data={collections}
          renderItem={this.getItemCompt}
          ItemSeparatorComponent={this.getItemSeparator}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={Platform.OS === 'android'}
          ListFooterComponent={this.getFooterCompt}
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
  const {collections} = state
  return {
    isRefreshing: collections.isRefreshing,
    collections: collections.collections,
    hasMoreData: collections.hasMoreData,
    isLoadingMore: collections.isLoadingMore,
    page: collections.page
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(MeFragment)


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
    alignItems: 'center'
  },
  title: {
    width: 50,
    color: '#6a6a6a',
    fontSize: 18
  }
})
