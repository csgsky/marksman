'use strict'
import React, {Component} from 'react'
import {View, FlatList, RefreshControl} from 'react-native'
import * as actions from '../actions/hotDiaryAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DiaryItem from '../component/item/DiaryItem'
import ListSeperator from '../component/ListSeperator'

class HotDiary extends Component {
  componentDidMount () {
    this.props.actions.recentDiaryInit()
  }

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

  getItemCompt = ({item, index}) => {
    return <DiaryItem item={item} hasComment= {true}/>
  }

  getItemSeparator = () => {
    return <ListSeperator />
  }
}

const mapStateToProps = (state) => {
  const {hotDiary} = state
  return {
    isRefreshing: hotDiary.isRefreshing,
    diarys: hotDiary.diarys
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(HotDiary)


