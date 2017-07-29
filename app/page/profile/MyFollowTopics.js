import React, {PureComponent} from 'react'
import {View, Text, FlatList, RefreshControl} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/myFollowTopicsAction'
import TopicItem from '../../component/item/TalksItem'
import theme from '../../config/theme'

class MyFollowTopics extends PureComponent {
  componentDidMount() {
    this.props.myFollowTopicsInit()
  }
  onRefresh = () => {
    this.props.myFollowTopicsInit()
  }
  handleLoadingMore = () => {
    if (this.props.hasMore && !this.props.isLoadingMore) {
      this.props.myFollowTopicsLoadMore({page: this.props.page})
    }
  }
  renderHeaderTitle = (title) => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          height: 55,
          paddingLeft: 16,
          paddingRight: 16
        }}>
          <View style={{width: 3, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15}}/>
          <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '500', color: theme.text.globalSubTextColor}}>{title}</Text>
          </View>
        </View>
      </View>
    )
  }
  renderEmptyView = desc => (
    <View>
      {this.renderHeaderTitle('我的关注')}
      <View style={{height: 187, justifyContent: 'center'}}>
        <Text style={{fontSize: 12, color: '#9b9b9b', textAlign: 'center'}}>{desc}</Text>
      </View>
      {this.renderHeaderTitle('推荐关注')}
    </View>
  )
  renderHeader = isEmpty => (
    <View>
      {!!isEmpty && this.renderEmptyView('您还没有关注任何话题哦～')}
      {!isEmpty && this.renderHeaderTitle('我的关注')}
    </View>
  )
  render() {
    const {topics, isRefreshing, isEmpty} = this.props
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={topics}
          renderItem={({item, index}) => (
            <TopicItem item={item} index={index} type="followed" navigation={this.props.navigation} onPressFollow={this.props.myFollowTopicsFollow}/>)}
          removeClippedSubviews={false}
          ListHeaderComponent={() => this.renderHeader(isEmpty)}
          onEndReached={() => this.handleLoadingMore()}
          onEndReachedThreshold={0.1}
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

const mapStateToProps = ({myFollowTopics}) => myFollowTopics
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyFollowTopics)
