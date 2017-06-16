import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, RefreshControl, StyleSheet, FlatList} from 'react-native'
import * as actions from '../actions/diaryDetailAction'
import theme from '../config/theme'
import DiaryItem from '../component/item/DiaryItem'
import PublicStamp from '../img/public_stamp.png'
import PrivateStamp from '../img/private_stamp.png'

class DiaryDetailPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '',
    headerStyle: {elevation: 0},
    headerRight: navigation.state.params.me ? <View style={{flexDirection: 'row'}}>
      <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
      <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
    </View>
      : <View style={{flexDirection: 'row', marginRight: 16}}>
        <Text style={{alignSelf: 'center', fontSize: 14, marginRight: 11}}>我是真的想你</Text>
        <Image style={{width: 40, height: 40}} resizeMode="contain" source={theme.imgs.DefaultUserAvatar}/>
      </View>,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}>
      <Image resizeMode="contain"
        style={{width: 18, height: 18, marginLeft: 16}}
        source={theme.imgs.PageBack} />
    </TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    // let diaryId = this.props.navigation.state.params.diaryId;
    this.props.actions.diaryCommentInit()
  }



  onRefresh = () => {
    console.warn('hahah ==> hehehe ===> hahah')
  }

  getHeaderView = () =>
    (<View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Image style={styles.stamp} resizeMode="contain" source={this.getDiaryTpye()}/>
      </View>
      <DiaryItem
        item={this.props.navigation.state.params.item}
        hasComment={false}
        showRightTime={false} />
    </View>)

  getDiaryTpye = () => {
    if (this.props.navigation.state.params.item.ifprivate === 1) {
      return PublicStamp
    } else if (this.props.navigation.state.params.item.ifprivate === 0) {
      return PrivateStamp
    }
    return PublicStamp
  }

  handleLoadingMore = () => {
    console.warn('加载更多。。。。。。 ')
  }


  render () {
    const {isRefreshing} = this.props
    const data = [{key: '...............'}, {key: '!!!!!!!!!!!!!!'}, {key: '##############'}, {key: '$$$$$$$$$$$$$$$$$'},
                {key: '...............q'}, {key: '!!!!!!!!!!!!!!w'}, {key: '##############w'}, {key: '$$$$$d$$$$$$$$$$$$'},
                {key: '............h...'}, {key: '!!!!!!!!g!!!!!'}, {key: '#####f#########'}, {key: '$$$$$$$$ss$$$$$$$$$'}]
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <FlatList
            data={data}
            renderItem={({item, index}) => <Text style={{height: 40}}>{item.key} + {index}</Text>}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={this.getHeaderView}
            onEndReached={this.handleLoadingMore}
            removeClippedSubviews={false}
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                color="#ccc"
                refreshing={isRefreshing}
              />
            }
        />
        </View>
      </View>
    )
  }






}



const styles = StyleSheet.create({
  stamp: {
    width: 50,
    height: 30,
    marginRight: 20
  }
})

const mapStateToProps = (state) => {
  const {diaryDetail} = state
  return {
    isRefreshing: diaryDetail.isRefreshing
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(DiaryDetailPage)