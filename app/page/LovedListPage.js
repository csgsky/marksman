import React, {Component} from 'react'
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/lovedActions'
import TopUserItem from '../component/item/TopuserItem'

class LovedListPage extends Component {
  componentDidMount () {
    this.props.actions.LovedListInit(0)
  }


  onRefresh = () => {
    this.props.actions.LovedListInit(0)
  }

  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.LovedListMore(page)
    } else {
      console.warn('loved 没有了')
    }
  }

  render () {
    const {isRefreshing, loved, navigation} = this.props
    const {LovedFollowed} = this.props.actions
    return (
      <View style={styles.view}>
        <FlatList
          data={loved}
          renderItem={({item, index}) =>
            (<TopUserItem
              item={item}
              position={index}
              LovedFollowed={LovedFollowed}
              navigation={navigation}/>)}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={false}
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
  const {lovedList} = state
  return {
    isRefreshing: lovedList.isRefreshing,
    loved: lovedList.loved,
    isLoadingMore: lovedList.isLoadingMore,
    hasMore: lovedList.hasMore,
    page: lovedList.page
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LovedListPage)
