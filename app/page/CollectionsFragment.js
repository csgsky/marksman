'use strict'
import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, RefreshControl} from 'react-native'
import CollectionItem from '../component/item/CollectionsItem'
import Separator from '../component/Separator'
import ListSeperator from '../component/ListSeperator'
import * as actions from '../actions/collectionsAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
class MeFragment extends Component {
  componentDidMount () {
    this.props.actions.collectionsInit('a9a392bb28f550366c1c55f59b35aac0f94ff1eb')
  }
  render () {
    const {collections, isRefreshing, navigation} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <View style={styles.titleView}><Text style = {styles.title}>文集</Text></View>
        </View>
        <Separator/>
        <FlatList
          data={collections}
          renderItem={this.getItemCompt}
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
      const {navigation}= this.props
    return <CollectionItem item={item} navigation={navigation}/>
  }

  getItemSeparator = () => {
    return <ListSeperator />
  }
}

const mapStateToProps = (state) => {
  const {collections} = state
  return {
    isRefreshing: collections.isRefreshing,
    collections: collections.collections
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(MeFragment)


const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: 'white'
  },
  titleView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 50,
    color: '#6a6a6a',
    fontSize: 18
  }
})
