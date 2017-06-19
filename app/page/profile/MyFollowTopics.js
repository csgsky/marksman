import React, {PureComponent} from 'react'
import {View, Text, FlatList, RefreshControl} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/myFollowTopicsAction'
import TopicItem from '../../component/item/TalksItem'
import theme from '../../config/theme'

class MyFollowTopics extends PureComponent {
  componentDidMount() {
    console.log('did mount')
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
  renderHeader = () => (<View style={{
    flexDirection: 'row',
    justifyContent: 'center',
    height: 55,
    paddingLeft: 16,
    paddingRight: 16
  }}>
    <View style={{width: 3, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15}}/>
    <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '500', color: theme.text.globalSubTextColor}}>我的关注</Text>
    </View>
  </View>)
  render() {
    const {topics, isRefreshing} = this.props
    console.log(this.props)
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={topics}
          renderItem={({item, index}) => (
            <TopicItem item={item} index={index} type="followed" onPressFollow={this.props.myFollowTopicsFollow}/>)}
          removeClippedSubviews={false}
          ListHeaderComponent={() => this.renderHeader()}
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