import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {View, Text, TouchableOpacity, Image, RefreshControl, StyleSheet, FlatList} from 'react-native'
import * as actions from '../actions/diaryAction'
import theme from '../config/theme'
import CommentItem from '../component/item/CommentItem'
import ListSeparator from '../component/ListSeparator'
import DiaryItem from '../component/item/DiaryItem'
import PublicStamp from '../img/public_stamp.png'
import PrivateStamp from '../img/private_stamp.png'
import DefaultUserAvatar from '../img/default_vatar.png'

class DiaryDetailPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: navigation.state.params.me ? <View style={{flexDirection: 'row'}}>
      <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
      <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
    </View>
      : <View style={{flexDirection: 'row', marginRight: 16}}>
        <Text style={{alignSelf: 'center', fontSize: 14, marginRight: 11}}>{navigation.state.params.item.nickname}</Text>
        <Image style={{width: 40, height: 40}} resizeMode="contain" source={DefaultUserAvatar}/>
      </View>,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}>
      <Image resizeMode="contain"
        style={{width: 18, height: 18, marginLeft: 16}}
        source={theme.imgs.PageBack} />
    </TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    const id = this.props.navigation.state.params.item.diary_id
    const ownerId = this.props.navigation.state.params.item.user_id
    console.warn('id ==> ' + id)
    console.warn('userId ==> ' + ownerId)
    this.props.diaryCommentInit({id, ownerId})
  }

  onRefresh = () => {
    const id = this.props.navigation.state.params.item.diary_id
    const ownerId = this.props.navigation.state.params.item.user_id
    this.props.diaryCommentInit({id, ownerId})
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
    return PrivateStamp
  }

  handleLoadingMore = () => {
    console.warn('加载更多。。。。。。 ')
  }


  render () {
    const {isRefreshing, comments} = this.props
    // console.log('comment render length ===> ' + comments.length)
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <FlatList
            data={comments}
            renderItem={({item}) => (<CommentItem data={item} navigation={this.props.navigation}/>)}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={this.getHeaderView}
            ItemSeparatorComponent={() => <ListSeparator/>}
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

const mapStateToProps = ({diaryDetail}) => diaryDetail

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DiaryDetailPage)
