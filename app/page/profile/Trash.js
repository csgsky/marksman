import React, {Component} from 'react'
import {View, FlatList, RefreshControl, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/trashActions'

import DiaryItem from '../../component/item/DiaryItem'
import ListSeparator from '../../component/ListSeparator'
import EmptyView from '../../component/EmptyView'
import theme from '../../config/theme'
import TrashModal from '../../widget/TrashModal'

class Trash extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '垃圾箱',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentDidMount () {
    this.props.actions.trashInit()
  }

  render () {
    const {diaries, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TrashModal
          _dialogVisible={this.state.showModal}
          hide={() => this.toggleDialog()}
          recoverDiary={() => this.props.recoverDiary()}
          deleteDiary={() => this.props.deleteDiary()}/>
        {!!diaries.length && <FlatList
          data={diaries}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
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
        />}
        {!isRefreshing && diaries.length === 0 && <EmptyView message="这片角落与我无关，嘎嘎~"/>}
      </View>
    )
  }
  getItemCompt = ({item}) => {
    return <DiaryItem item={item} hasComment={false} showDialog={this.toggleDialog}/>
  }
  toggleDialog = () => {
    console.log('toggle dialog')
    this.setState({
      showModal: !this.state.showModal
    })
  }
  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.trashMore(page)
    } else {
      console.warn('trash 没有了')
    }
  }
}

const mapStateToProps = ({trash}) => {
  return {
    isRefreshing: trash.isRefreshing,
    diaries: trash.diaries,
    isLoadingMore: trash.isLoadingMore,
    page: trash.page,
    hasMore: trash.hasMore
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Trash)
