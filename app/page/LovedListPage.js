import React, {Component} from 'React'
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native'
import theme from '../config/theme'
import * as actions from '../actions/lovedActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TopUserItem from '../component/item/TopuserItem'
class LovedListPage extends Component {
  componentDidMount () {
    this.props.actions.LovedListInit(0)
  }
  render () {
    const {isRefreshing, loved, navigation} = this.props
    return (
      <View style={styles.view}>
        <FlatList
          data={loved}
          renderItem={({item}) => <TopUserItem item={item} navigation = {navigation}/>}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={false}
          onEndReached={(e) => this.handleLoadingMore(e)}
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

  handleLoadingMore = (e) => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.LovedListMore(page)
    } else {
      console.warn('loved 没有了')
    }
  }

  onRefresh = () => {
    this.props.actions.LovedListInit(0)
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LovedListPage)
