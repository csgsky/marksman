import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, FlatList, Image, RefreshControl} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/message'
import theme from '../../config/theme'
import ListSeparator from '../../component/ListSeparator'
import Sepatator from '../../component/Separator'
import Footer from '../../component/Footer'
import EmptyView from '../../component/EmptyPageView'

class UserNewsPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '用户',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount() {
    this.props.mineMessageUserInit({page: 0})
  }

  onRefresh = () => {
    this.props.mineMessageUserInit({page: 0})
  }

  getItemSeparator = () => <ListSeparator />

  getUserIconSource = (img) =>
   img === '' || img === null ? theme.imgs.DefaultUserAvatar : {uri: img}

  handleLoadingMore = () => {
    const {isLoadingMore, hasMoreData, page} = this.props
    if (hasMoreData && !isLoadingMore) {
      this.props.mineMessageUserMore({page})
    }
  }

  getHeaderCompt = () => {
    const {users, isRefreshing} = this.props
    if (!isRefreshing && users.length === 0) {
      return <EmptyView come4="msg" message="还没有消息哦~~" />
    }
    return <View />
  }

  _routerToPersonalPage = (owner) => {
    if (owner) {
      this.props.navigation.navigate('PersonalPage', {message: '个人主页', id: owner.user_id})
    }
  }

  renderLoadMoreFooter = () => {
    const {hasMoreData, users} = this.props
    if (users.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }

  renderListItem = (item) => {
    return (<TouchableOpacity style={styles.itemView} onPress={() => this._routerToPersonalPage(item.owner)}>
      <Image style={{width: 42, height: 42, borderRadius: 21}} source={this.getUserIconSource(item.obj_img)}/>
      <View style={{marginLeft: 19, flex: 1}}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
      </View>
    </TouchableOpacity>)
  }

  render () {
    return (<View style={styles.view}>
      <Sepatator />
      <FlatList
        removeClippedSubviews={false}
        data={this.props.users}
        ItemSeparatorComponent={this.getItemSeparator}
        renderItem={({item}) => this.renderListItem(item)}
        onEndReachedThreshold={0.1}
        onEndReached={this.handleLoadingMore}
        ListHeaderComponent={this.getHeaderCompt}
        ListFooterComponent={this.renderLoadMoreFooter}
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh}
            color="#ccc"
            refreshing={false}
          />
         }
      />
    </View>)
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  itemView: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  content: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor,
    flex: 1,
    marginTop: 15,
    marginBottom: 15
  },
  name: {
    fontSize: theme.text.xxlgFontSize,
    color: '#c37f2e',
    marginTop: 15
  },
})

const mapStateToProps = ({message}) => message

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(UserNewsPage)