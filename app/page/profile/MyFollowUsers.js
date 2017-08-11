import React, {PureComponent} from 'react'
import {View, Text, FlatList, RefreshControl} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/myFollowUsersAction'
import UserItem from '../../component/item/TopuserItem'
import Footer from '../../component/Footer'
import theme from '../../config/theme'
import ListSeparator from '../../component/ListSeparator'

class MyFollowUsers extends PureComponent {
  componentDidMount() {
    this.props.myFollowUsersInit()
  }
  onRefresh = () => {
    this.props.myFollowUsersInit()
  }
  handleLoadingMore = () => {
    if (this.props.hasMore && !this.props.isLoadingMore) {
      this.props.myFollowUsersLoadMore({page: this.props.page})
    }
  }
  renderHeaderTitle = (title) => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 35,
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 10
        }}>
          <View style={{width: 4, backgroundColor: '#aecc9a', height: 15}}/>
          <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: '500', color: theme.text.globalSubTextColor}}>{title}</Text>
          </View>
        </View>
      </View>
    )
  }
  renderEmptyView = desc => (
    <View>
      {this.renderHeaderTitle('我的关注')}
      <View style={{height: 187, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: theme.border.color}}>
        <Text style={{fontSize: 12, color: '#9b9b9b', textAlign: 'center', paddingBottom: 35}}>{desc}</Text>
      </View>
      {this.renderHeaderTitle('推荐关注')}
    </View>
  )
  renderHeader = isEmpty => (
    <View>
      {!!isEmpty && this.renderEmptyView('您还没有关注任何用户哦～')}
      {!isEmpty && this.renderHeaderTitle('我的关注')}
    </View>
  )
  getFooterCompt = () => {
    const {users, hasMore} = this.props
    if (users.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }
  render() {
    const {users, isRefreshing, isEmpty, navigation} = this.props
    console.log(this.props)
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={users}
          renderItem={({item, index}) => (
            <UserItem item={item} position={index} navigation={navigation} LovedFollowed={this.props.myFollowUsersFollow}/>)}
          removeClippedSubviews={false}
          ListHeaderComponent={() => this.renderHeader(isEmpty)}
          ListFooterComponent={this.getFooterCompt}
          ItemSeparatorComponent={() => <ListSeparator/>}
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

const mapStateToProps = ({myFollowUsers}) => myFollowUsers
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyFollowUsers)
