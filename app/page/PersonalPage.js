import React, {PureComponent} from 'react'
import {View, FlatList, RefreshControl, TouchableOpacity, Image, AsyncStorage} from 'react-native'
// import * as actions from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import * as actions from '../actions/personAction'
import DiaryItem from '../component/item/DiaryItem'
import PersonalInfoView from '../component/PersonalInfo'
import ListSeparator from '../component/ListSeparator'
import CustomButton from '../component/Button'
import Footer from '../component/Footer'

class PersonalPage extends PureComponent {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff', borderBottomColor: '#fff', borderBottomWidth: 0, shadowColor: '#fff'},
    headerRight: <CustomButton title="关注" onPress={navigation.state.params.onPressFollow} myFocus={navigation.state.params.myFocus}/>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })
  componentDidMount () {
    console.log('person Init at component did mount')
    this.props.navigation.setParams({
      onPressFollow: this._onPressFollow
    })
    this.props.actions.personInit(this.props.navigation.state.params.id)
    PubSub.subscribe('refreshDetailPage', this.onRefresh)
    PubSub.subscribe('commentsLikeRefresh', this.onRefresh)
  }
  componentWillReceiveProps(nextProps) {
    console.log('component will receive props')
    const oldMyFocus = this.props.info.my_focus;
    const myFocus = nextProps.info.my_focus;
    if (oldMyFocus !== myFocus) {
      this.props.navigation.setParams({
        myFocus
      })
    }
  }
  render () {
    const {info, diaries, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {diaries && info && <FlatList
          data={diaries}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={() => <ListSeparator/>}
          ListHeaderComponent={() => <PersonalInfoView info={info}/>}
          onEndReached={() => this.handleLoadingMore()}
          ListFooterComponent={this.getFooterCompt}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              color="#ccc"
              refreshing={isRefreshing}
            />
          }
        />}
      </View>
    )
  }
  componentWillUnmount() {
    console.log('component will unmount')
    this.props.actions.clearPersonData()
  }
  onRefresh = () => {
    this.props.actions.personInit(this.props.navigation.state.params.id)
  }

  getItemCompt = ({item, index}) => {
    return (<DiaryItem item={item}
      navigation={this.props.navigation}
      hasComment
      showRightTime
      showUserInfo
      likeDiary={this._likeDiary}
      index={index}/>)
  }

  getFooterCompt = () => {
    const {diaries, hasMore} = this.props
    if (diaries.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }
  _likeDiary = (diaryId, ownerId, myLike, index) => {
    console.log({diaryId, ownerId, myLike, index})
    if (myLike) {
      return
    }
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'personalPage'})
      } else {
        this.props.actions.personDiaryLike({diaryId, ownerId, index})
      }
    })
  }
  _onPressFollow = () => {
    const {info} = this.props;
    AsyncStorage.getItem('userId').then((result) => {
      if (result === null) {
        this.props.navigation.navigate('Login', {come4: 'personalPage'})
      } else {
        this.props.actions.personFollow({userId: info.user_id, myFocus: info.my_focus})
      }
    })
  }
  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.personDiaryMore(page, this.props.navigation.state.params.id)
    }
  }
}

const mapStateToProps = (state) => {
  const {personalData: {info, diaries, isRefreshing, isLoadingMore, hasMore, page}} = state
  return {
    info,
    diaries,
    isRefreshing,
    isLoadingMore,
    hasMore,
    page
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)
