'use strict'
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, RefreshControl} from 'react-native'
import * as actions from '../actions/homeActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as consts from '../utils/const'
import theme from '../config/theme'
import Separator from '../component/Separator'
import DiaryItem from '../component/item/DiaryItem'
import ListSeparator from '../component/ListSeparator'

var ImagePicker = require('react-native-image-picker')
// 加密使用
var CryptoJS = require('crypto-js')


var options = {
  title: '图片选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 600,
  maxHeight: 600,
  aspectX: 2,
  aspectY: 1,
  quality: 0.8,
  angle: 0,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
class HomeFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 测试上传头像问题
      avatarSource: ''
    }
  }
  componentDidMount () {
    this.props.actions.homeInit()
  }

  render () {
    // 加密
    // var base64 = require('base-64')
    // var utf8 = require('utf8')
    // var rawStr = '/ZTE/ZTE1.1.3/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null'
    // var words = encodeURIComponent(rawStr)
    // var base64 = base64.encode(words)
    // var hmacSHA1 = CryptoJS.HmacSHA1(base64, 'qy_0_23').toString(CryptoJS.enc.Hex)
    // console.log('hmacSHA1 ==> ' + hmacSHA1)
    const {diarys, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={{width: 52,height: 52, justifyContent: 'center'}} onPress={this._onRouterMine}>
            <Image source={require('../img/mine.png')} style = {styles.profile}></Image>
          </TouchableOpacity>
          <View style={styles.titleView}><Text style = {styles.title}>{consts.appName}</Text></View>
          <TouchableOpacity style={{width: 52,height: 52, alignItems: 'center', marginTop: 16}} onPress={this._onRouterSearch}>
            <Image source={require('../img/search.png')} style = {styles.search}></Image>
          </TouchableOpacity>
        </View>
        <Separator />
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
        <TouchableOpacity style={styles.penView} onPress={this._onRouterWrite}>
          <Image source={require('../img/pen.png')} style = {styles.pen} ></Image>
        </TouchableOpacity>
      </View>
    )
  }

  _onRouterMine = () => {
    this.props.navigation.navigate('PersonalCenter', {message: '个人中心'})
  }
  _onRouterSearch = () => {
    this.props.navigation.navigate('SearchPage',{message: '搜索'})
  }
  _onRouterWrite = () => {
    this.props.navigation.navigate('WriteDiaryPage',{message: '写日记'})
  }

  getItemCompt = ({item, index}) => {
    const {navigation} = this.props
    return <DiaryItem item={item} navigation={navigation} hasComment = {false}/>
  }
  
  getItemSeparator = () => {
    return <ListSeparator />
  }

  onRefresh = () => {
    this.props.actions.homeInit('a9a392bb28f550366c1c55f59b35aac0f94ff1eb')
  }
  openImagePicker () {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }
        this.setState({
          value: response.data,
          avatarSource: source
        })
      }
    })
  }
}

const mapStateToProps = (state) => {
  const {homePage} = state
  return {
    isRefreshing: homePage.isRefreshing,
    diarys: homePage.diarys
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

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
    alignItems: 'center',
  },
  title: {
    width: 50,
    color: '#6a6a6a',
    fontSize: 18
  },
  profile: {
    width: 15,
    height: 15,
    marginLeft: 16
  },
  search: {
    width: 18,
    height: 18,
    marginRight: 4
  },
  penView: {
    position: 'absolute',
    right: 25,
    top: theme.screenHeight - 140
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment)
