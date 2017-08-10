import React, {Component} from 'react'
import {StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import theme from '../config/theme'
import * as actions from '../actions/topicsAction'
import TalksItem from '../component/item/TalksItem'
import Footer from '../component/Footer'
import NewsTalksItem from '../component/item/NewsTalksItem'
import EmptyView from '../component/EmptyPageView'

class TopicListPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '备受宠爱',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    console.log('componentDidMount', this.props.navigation.state.params.come4)
    this.initData()
  }
  componentWillUnmount() {
    this.props.actions.clearPageData()
  }

  onRefresh = () => {
    this.initData()
  }

  getHeaderCompt = () => {
    const {talks, isRefreshing} = this.props
    if (!isRefreshing && talks.length === 0) {
      return <EmptyView come4="msg" message="还没有消息哦~~" />
    }
    return <View />
  }

  initData = () => {
    this.props.actions.topicListInit(0, this.props.navigation.state.params.come4)
  }


  handleLoadingMore = (e) => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.topicListMore(page, this.props.navigation.state.params.come4)
    }
  }

  renderListItem = ({item, index}) => {
    const {navigation} = this.props
    const come4 = navigation.state.params.come4
    if (come4 === 'news') {
      return <NewsTalksItem item={item} navigation={navigation}/>
    }
    return <TalksItem item={item} index={index} navigation={navigation}/>
  }

  renderLoadMoreFooter = () => {
    const {hasMore, talks} = this.props
    if (talks.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }

  render () {
    const {isRefreshing, talks} = this.props
    return (
      <View style={styles.view}>
        <FlatList
          data={talks}
          renderItem={this.renderListItem}
          onEndReachedThreshold={0.1}
          onEndReached={(e) => this.handleLoadingMore(e)}
          removeClippedSubviews={false}
          ListFooterComponent={this.renderLoadMoreFooter}
          ListHeaderComponent={this.getHeaderCompt}
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
  const {talkList} = state
  return {
    isRefreshing: talkList.isRefreshing,
    talks: talkList.talks,
    isLoadingMore: talkList.isLoadingMore,
    hasMore: talkList.hasMore,
    page: talkList.page
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicListPage)
