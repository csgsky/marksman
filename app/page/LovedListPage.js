import React, {Component} from 'react'
import {StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/lovedActions'
import TopUserItem from '../component/item/TopuserItem'
import theme from '../config/theme'
import Separator from '../component/Separator'
import Footer from '../component/Footer'
import ListSeparator from '../component/ListSeparator'

class LovedListPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '精选话题',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    this.props.actions.LovedListInit(0)
  }

  componentWillUnmount() {
    PubSub.publish('discoveryfragment/init/data')
  }

  onRefresh = () => {
    this.props.actions.LovedListInit(0)
  }

  getItemSeparator = () => <ListSeparator />

  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.LovedListMore(page)
    }
  }

  renderLoadMoreFooter = () => {
    const {hasMore, loved} = this.props
    if (loved.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }

  render () {
    const {isRefreshing, loved, navigation} = this.props
    const {LovedFollowed} = this.props.actions
    return (
      <View style={styles.view}>
        <Separator />
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
          ItemSeparatorComponent={this.getItemSeparator}
          onEndReached={this.handleLoadingMore}
          ListFooterComponent={this.renderLoadMoreFooter}
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
