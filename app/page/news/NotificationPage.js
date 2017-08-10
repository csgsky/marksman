import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, Image, FlatList, RefreshControl, Platform} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/message'
import theme from '../../config/theme'
import ListSeparator from '../../component/ListSeparator'
import Footer from '../../component/Footer'
import NoticeIcon from '../../img/news_notice.png'
import EmptyView from '../../component/EmptyPageView'

class NotificationPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '通知',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount() {
    this.props.mineMessageNotifInit({page: 0})
  }

  onRefresh = () => {
    this.props.mineMessageNotifInit({page: 0})
  }

  getItemSeparator = () => <ListSeparator />

  getHeaderCompt = () => {
    const {notifications, isRefreshing} = this.props
    if (!isRefreshing && notifications.length === 0) {
      return <EmptyView come4="msg" message="还没有消息哦~~" />
    }
    return <View />
  }

  handleLoadingMore = () => {
    const {isLoadingMore, hasMoreData, page} = this.props
    if (hasMoreData && !isLoadingMore) {
      this.props.mineMessageNotifMore({page})
    }
  }
  renderLoadMoreFooter = () => {
    const {hasMoreData, notifications} = this.props
    if (notifications.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }


  renderListItem = (item) => {
    return (<TouchableOpacity style={styles.itemView}>
      <Image source={NoticeIcon} style={styles.icon} />
      <View style={{marginLeft: 16}}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </TouchableOpacity>)
  }

  render () {
    const {isRefreshing} = this.props
    return (<View style={styles.view}>
      {!isRefreshing && this.props.notifications.length > 0 && <FlatList
        removeClippedSubviews={Platform.OS === 'android'}
        data={this.props.notifications}
        ItemSeparatorComponent={this.getItemSeparator}
        renderItem={({item}) => this.renderListItem(item)}
        ListFooterComponent={this.renderLoadMoreFooter}
        ListHeaderComponent={this.getHeaderCompt}
        onEndReached={this.handleLoadingMore}
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh}
            color="#ccc"
            refreshing={false}
          />
         }
      />}
      {
        !isRefreshing && this.props.notifications.length === 0 && <EmptyView come4="diary" message="这个人很懒，什么都没留下~~" />
      }
    </View>)
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  icon: {
    width: 37,
    height: 37
  },
  itemView: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    fontSize: theme.text.lgFontSize,
    color: theme.text.globalSubTextColor,
    marginTop: 3
  },
  name: {
    fontSize: theme.text.xlgFontSize,
    color: theme.text.globalTextColor
  }
})

const mapStateToProps = ({message}) => message

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)

