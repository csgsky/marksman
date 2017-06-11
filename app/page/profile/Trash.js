import React, {Component} from 'react'
import {View, FlatList, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../../actions/trashActions'
import {bindActionCreators} from 'redux'
import DiaryItem from '../../component/item/DiaryItem'
import ListSeparator from '../../component/ListSeparator'
import EmptyView from '../../component/EmptyView'
// import theme from '../../config/theme'

class Trash extends Component {
  componentDidMount () {
    this.props.actions.trashInit()
  }

  render () {
    const {diaries, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
        {!diaries.length && <EmptyView message="这片角落与我无关，嘎嘎~"/>}
      </View>
    )
  }
  getItemCompt = ({item}) => {
    return <DiaryItem item={item} hasComment={false}/>
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
