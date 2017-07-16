import React, {Component} from 'react'
import {StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import theme from '../config/theme'
import * as actions from '../actions/topicsAction'
import TalksItem from '../component/item/TalksItem'
import Footer from '../component/Footer'

class TopicListPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '备受宠爱',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    this.initData()
  }

  onRefresh = () => {
    this.initData()
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

  renderLoadMoreFooter = () => {
    const {hasMore, talks} = this.props
    if (talks.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }

  render () {
    const {isRefreshing, talks, navigation} = this.props
    return (
      <View style={styles.view}>
        <FlatList
          data={talks}
          renderItem={({item, index}) => <TalksItem item={item} index={index} navigation={navigation}/>}
          onEndReachedThreshold={0.1}
          onEndReached={(e) => this.handleLoadingMore(e)}
          removeClippedSubviews={false}
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
    backgroundColor: 'white'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicListPage)
