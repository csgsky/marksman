'use strict'
import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, SectionList, FlatList, RefreshControl} from 'react-native'
import Separator from '../component/Separator'
import * as actions from '../actions/discoverAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import theme from '../config/theme'
import Swiper from 'react-native-swiper'
import TalksItem from '../component/item/TalksItem'
import RecommendUserItem from '../component/item/RecommondUsersItem'
let deviceWidth = Dimensions.get('window').width
class DiscoveryFrament extends Component {

  constructor (props) {
    super (props)
  }
  componentDidMount () {
    this.props.actions.discoveryInit()
  }
  render () {
    const {talks, ranks, banners, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <View style={styles.titleView}><Text style = {styles.title}>精选</Text></View>
        </View>
        <Separator/>
        <SectionList
          ListHeaderComponent={this.getHeaderView}
          renderSectionHeader={this.getSectionView}
          removeClippedSubviews={false}
          sections={[
            {data: talks, key: 'talks', renderItem: this.getTalksItem},
            {data: [{data: ranks}], key: 'ranks', renderItem: this.getRanksItem}
            ]}
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

  onRefresh = () => {
    this.props.actions.discoveryInit()
  }

  getTalksItem = ({item}) => {
    return <TalksItem item={item} navigation={this.props.navigation}/>
  }

  getRanksItem = ({item}) => {
    const {navigation} = this.props
    return <FlatList
            horizontal={true}
            removeClippedSubviews={false}
            data={item.data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <RecommendUserItem item={item}  navigation = {navigation}/>}
            />
  }

  getSectionView = ({section}) => {
    const {talks, ranks} = this.props
    if(section.key === 'talks' && talks.length > 0) {
      return this.getTalksSectionHeader()
    } else if(section.key === 'ranks' && ranks.length > 0){
      return this.getTopUsersSectionHeader()
    }
  }

  getHeaderView = () => {
        const {banners} = this.props
        if(banners.length > 0) {
          return <Swiper style={styles.wrapper}
                       height={170}
                       activeDot={<View style={
                              styles.activeDot}/>}
                       dot={<View style={styles.dot}/>}
                       showsButtons={false}
                       autoplay
                       autoplayTimeout={5}>
                      {
                        banners.map((item, i) => <View key={i} style={styles.slide}>
                          {/*<Image source={{uri: item.img_url}} style={styles.image}/>*/}
                        </View>)}
              </Swiper>
       } else {
         return <View />
       }
  }

  getTalksSectionHeader = () => {
    return <View style={styles.talksSection}>
      <View style={{width: 3, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15}}></View>
      <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '500', color: theme.text.globalSubTextColor}}>浅言浅语</Text>
      </View>
      <TouchableOpacity style={{flexDirection: 'column', justifyContent: 'center'}} onPress={this._routerToTopicList}>
        <Text style={{fontSize: 15, color: theme.text.globalSubTextColor}}>更多</Text>
      </TouchableOpacity>
    </View>
  }

  getTopUsersSectionHeader = () => {
    return <View style={styles.talksSection}>
      <View style={{width: 3, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15}}></View>
      <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '500', color: theme.text.globalSubTextColor}}>备受宠爱</Text>
      </View>
      <TouchableOpacity style={{flexDirection: 'column', justifyContent: 'center'}} onPress={this._routerToLovedList}>
        <Text style={{fontSize: 15, color: theme.text.globalSubTextColor}}>更多</Text>
      </TouchableOpacity>
    </View>
  }
  
  _routerToTopicList = () => {
      this.props.navigation.navigate('TopicListPage',{message: '精选话题'})
  }

  _routerToLovedList = () => {
      this.props.navigation.navigate('LovedListPage',{message: '备受宠爱'})
  }
}

const mapStateToProps = (state) => {
  const {discovery} = state
  return {
    isRefreshing: discovery.isRefreshing,
    talks: discovery.talks,
    ranks: discovery.ranks,
    banners: discovery.banners
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
    alignItems: 'center'
  },
  title: {
    width: 50,
    color: '#6a6a6a',
    fontSize: 18
  },
  talksSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 55,
    paddingLeft: 16,
    paddingRight: 16
  },
  wrapper: {
    
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  image: {
    width: deviceWidth,
    height: 160
  },
  activeDot: {
    backgroundColor: 'blue',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3
  },
  dot: {
    backgroundColor: '#fff',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryFrament)
