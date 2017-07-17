import React, {Component} from 'react'
import {View, FlatList, RefreshControl, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/trashActions'
import {deleteDiary} from '../../actions/diaryDetailAction'
import DiaryItem from '../../component/item/DiaryItem'
import ListSeparator from '../../component/ListSeparator'
import EmptyView from '../../component/EmptyView'
import theme from '../../config/theme'
import TrashModal from '../../widget/TrashModal'
import LoadingMore from '../../component/LoadingMore'
import NoMoreData from '../../component/NoMoreData'

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
      showModal: false,
      index: 0
    }
  }

  componentDidMount () {
    this.props.actions.trashInit()
    PubSub.subscribe('refreshTrashList', () => this.props.actions.trashInit())
  }

  getItemCompt = ({item, index}) => {
    return <DiaryItem item={item} hasComment={false} showDialog={() => this.toggleDialog(index)}/>
  }

  getFooterCompt = () => {
    const {diaries, hasMore, isLoadingMore} = this.props
    if (diaries.length > 0 && hasMore && isLoadingMore) {
      return <LoadingMore />
    } else if (diaries.length > 0 && !hasMore) {
      return <NoMoreData />
    }
    return <View />
  }


  toggleDialog = (index) => {
    console.warn('toggle dialog ==> ' + index)
    this.setState({
      showModal: !this.state.showModal,
      index
    })
  }

  _recoverDiary = () => {
    const payload = {diarys: [{diary_id: this.props.diaries[this.state.index].diary_id}]}
    this.props.actions.recoverDiary(payload)
    this.setState({
      showModal: !this.state.showModal
    })
  }

  _deleteDiary = () => {
    const payload = {diarys: [{diary_id: this.props.diaries[this.state.index].diary_id}], mode: 1}
    this.props.actions.deleteDiary(payload)
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleLoadingMore = () => {
    const {isLoadingMore, hasMore, page} = this.props
    if (!isLoadingMore && hasMore) {
      this.props.actions.trashMore(page)
    }
  }

  render () {
    const {diaries, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TrashModal
          _dialogVisible={this.state.showModal}
          hide={() => this.toggleDialog()}
          recoverDiary={this._recoverDiary}
          deleteDiary={this._deleteDiary}/>
        {diaries && !!diaries.length && <FlatList
          data={diaries}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={() => <ListSeparator/>}
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
        {diaries && diaries.length === 0 && <EmptyView message="这片角落与我无关，嘎嘎~"/>}
      </View>
    )
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...actions, deleteDiary}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Trash)
