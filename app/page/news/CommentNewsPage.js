import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Alert, AsyncStorage, View, Text, Image, FlatList, RefreshControl, Platform} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/message'
import theme from '../../config/theme'
import ListSeparator from '../../component/ListSeparator'
import Footer from '../../component/Footer'

class CommentNewPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '评论',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount() {
    this.props.mineMessageCommentInit({page: 0})
  }

  getItemSeparator = () => <ListSeparator />


  getIconSource = (url) => {
    if (url === '') {
      return theme.imgs.DefaultUserAvatar
    }
    return {uri: url}
  }
  handleLoadingMore = () => {
    const {isLoadingMore, hasMoreData, page} = this.props
    if (hasMoreData && !isLoadingMore) {
      this.props.mineMessageCommentMore({page})
    }
  }

  _routerToDiary = (item) => {
    if (item === null) {
      Alert.alert(
      '提示',
      '该日记已被删除',
        [
          {text: '确定', onPress: () => {}}
        ],
        { cancelable: false }
      )
      return
    }
    const {navigation } = this.props
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        navigation.navigate('DiaryDetailPage', {me: false, item})
      } else {
        if (result === item.user_id) {
          navigation.navigate('DiaryDetailPage', {me: true, item})
          return
        }
        navigation.navigate('DiaryDetailPage', {me: false, item})
      }
    })
  }

  renderLoadMoreFooter = () => {
    const {hasMoreData, commemts} = this.props
    if (commemts.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }

  renderListItem = (item) => {
    const title = item.name.split(item.obj_name)
    const userLeft = title.length >= 2 && title[0]
    const userRight = title.length >= 2 && title[1]
    return (<TouchableOpacity style={styles.itemView} onPress={() => this._routerToDiary(item.diary)}>
      <Image source={this.getIconSource(item.obj_img)} style={styles.icon} />
      <View style={{flex: 1, marginLeft: 16, marginRight: 16}}>
        <Text style={styles.name}>{userLeft}<Text style={{color: '#6082a7', fontSize: theme.text.xlgFontSize}}>
          {item.obj_name}</Text>{userRight}</Text>
        <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
      </View>
    </TouchableOpacity>)
  }

  render () {
    return (<View style={styles.view}>
      <FlatList
        data={this.props.commemts}
        ItemSeparatorComponent={this.getItemSeparator}
        renderItem={({item}) => this.renderListItem(item)}
        ListFooterComponent={this.renderLoadMoreFooter}
        removeClippedSubviews={Platform.OS === 'android'}
        onEndReached={this.handleLoadingMore}
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
  icon: {
    width: 37,
    height: 37,
    borderRadius: 18
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
    color: theme.text.globalTextColor,
    marginBottom: 3
  }
})

const mapStateToProps = ({message}) => message

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CommentNewPage)
