import React, {Component} from 'React'
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native'
import theme from '../config/theme'
import * as actions from '../actions/topicsAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TalksItem from '../component/item/TalksItem'
class TopicListPage extends Component {
  componentDidMount () {
    this.props.actions.topicListInit(0)
  }
  render () {
    const {isRefreshing, talks, navigation} = this.props
    return (
      <View style={styles.view}>
        <FlatList
          data={talks}
          renderItem={({item,index}) => <TalksItem item={item} index = {index} navigation = {navigation}/>}
          onEndReachedThreshold={0.1}
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
      this.props.actions.topicListMore(page)
    } else {
      console.warn('talks 没有了')
    }
  }

  onRefresh = () => {
    this.props.actions.topicListInit(0)
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
