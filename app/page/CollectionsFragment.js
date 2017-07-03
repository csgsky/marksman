import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, Platform, RefreshControl} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Rx from 'rxjs'
import CollectionItem from '../component/item/CollectionsItem'
import Separator from '../component/Separator'
import ListSeparator from '../component/ListSeparator'
import * as actions from '../actions/collectionsAction'
import LoadingMore from '../component/LoadingMore'
import NoMoreData from '../component/NoMoreData'

class MeFragment extends Component {
  componentDidMount () {
    this.props.actions.collectionsInit(0)
  }

  onRefresh = () => {
    this.props.actions.collectionsInit(0)
  }

  getItemSeparator = () => <ListSeparator />

  getItemCompt = ({item}) => {
    const {navigation} = this.props
    return <CollectionItem item={item} navigation={navigation}/>
  }

  getFooterCompt = () => {
    const {collections, hasMoreData, isLoadingMore} = this.props
    // console.warn('getFooterCompt diary length ==> ' + diarys.length)
    // console.warn('getFooterCompt diary hasMoreData ==> ' + hasMoreData)
    // console.warn('getFooterCompt diary isLoadingMore ==> ' + isLoadingMore)
    if (collections.length > 0 && hasMoreData && isLoadingMore) {
      return <LoadingMore />
    } else if (collections.length > 0 && !hasMoreData) {
      return <NoMoreData />
    }
    return <View />
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <View style={styles.titleView}><Text style={styles.title}>文集</Text></View>
        </View>
        <Separator/>
        <FlatList
          data={collections}
          renderItem={this.getItemCompt}
          ItemSeparatorComponent={this.getItemSeparator}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
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
