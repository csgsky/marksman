import React, {Component} from 'react'
import {View, FlatList, RefreshControl} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/hotDiaryAction'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'

class HotDiary extends Component {
  componentDidMount () {
    this.props.actions.recentDiaryInit()
  }

  getItemCompt = ({item}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment={false} showRightTime={true} />
  }

  getItemSeparator = () => <ListSeparator />
  render () {
    const {diarys, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={diarys}
          renderItem={this.getItemCompt}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.getItemSeparator}
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

const mapStateToProps = (state) => {
  const {hotDiary} = state
  return {
    isRefreshing: hotDiary.isRefreshing,
    diarys: hotDiary.diarys
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(HotDiary)


