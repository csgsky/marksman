import React, {Component} from 'react'
import {View, FlatList, RefreshControl, TouchableOpacity, Image} from 'react-native'
// import * as actions from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/personAction'
import DiaryItem from '../component/item/DiaryItem'
import PersonalInfoView from '../component/PersonalInfo'
import ListSeparator from '../component/ListSeparator'
import CustomButton from '../component/Button'
import Footer from '../component/Footer'

class PersonalPage extends Component {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff', borderBottomColor: '#fff', borderBottomWidth: 0, shadowColor: '#fff'},
    headerRight: <CustomButton title="关注" onPress={navigation.state.params.onPressFollow} myFocus={navigation.state.params.myFocus}/>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })

  componentDidMount () {
    this.props.navigation.setParams({
      onPressFollow: this._onPressFollow
    })
    this.props.actions.personInit(this.props.navigation.state.params.id)
  }
  componentWillReceiveProps(nextProps) {
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
        {!!diaries.length && <FlatList
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

  getItemCompt = ({item}) => {
    return <DiaryItem item={item} hasComment/>
  }

  getFooterCompt = () => {
    const {diaries, hasMore} = this.props
    if (diaries.length > 0) {
      return <Footer hasMoreData={hasMore}/>
    }
    return <View />
  }
  _onPressFollow = () => {
    const {info} = this.props;
    this.props.actions.personFollow({userId: info.user_id, myFocus: info.my_focus})
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
