import React, {Component} from 'React'
import {StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Image, Button} from 'react-native'
import theme from '../config/theme'
import * as actions from '../actions/personAction'
// import * as actions from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DiaryItem from '../component/item/DiaryItem'
import PersonalInfoView from '../component/PersonalInfo'
import ListSeparator from '../component/ListSeparator'
import CustomButton from '../component/Button'

class PersonalPage extends Component {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: 'transparent', borderBottomWidth: 0},
    headerRight: <CustomButton title="关注"/>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })

  componentDidMount () {
    this.props.actions.personInit(this.props.navigation.state.params.id)
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
  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.personDiaryMore(page)
    } else {
      console.warn('person diaries 没有了')
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
