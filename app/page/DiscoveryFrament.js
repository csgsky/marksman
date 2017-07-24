import React, {Component} from 'react'
import {Text, View, Image, StyleSheet, Platform, TouchableOpacity, SectionList, FlatList, RefreshControl} from 'react-native'
import { bindActionCreators } from 'redux'
import PubSub from 'pubsub-js'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import theme from '../config/theme'
import TalksItem from '../component/item/TalksItem'
import Separator from '../component/Separator'
import * as actions from '../actions/discoverAction'
import RecommendUserItem from '../component/item/RecommondUsersItem'
import Footer from '../component/Footer'

class DiscoveryFrament extends Component {

  componentDidMount () {
    this.props.actions.discoveryInit()
    PubSub.subscribe('homefragment/init/data', this.onRefresh)
  }

  componentWillUnmount() {
    PubSub.unsubscribe('homefragment/init/data')
  }

  render () {
    console.log('DiscoveryFrament render')
    const {talks, ranks, isRefreshing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.toolbar}>
          <View style={styles.titleView}><Text style={styles.title}>精选</Text></View>
        </View>
        <Separator/>
        <SectionList
          ListHeaderComponent={this.getHeaderView}
          renderSectionHeader={this.getSectionView}
          removeClippedSubviews={false}
          stickySectionHeadersEnabled={false}
          ListFooterComponent={this.getFooterCompt}
          onEndReached={this.handleLoadingMore}
          SectionSeparatorComponent={() => <Separator />}
          onEndReachedThreshold={0.1}
          sections={[
            {data: [{data: ranks}], key: 'ranks', renderItem: this.getRanksItem},
            {data: talks, key: 'talks', renderItem: this.getTalksItem}
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

  getFooterCompt = () => {

    const {talks, hasMoreData} = this.props
    console.log('getFooter')
    console.log(hasMoreData)
    if (talks.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }

  handleLoadingMore = () => {
    const {page, hasMoreData, isLoadingMore} = this.props
    if (hasMoreData && !isLoadingMore) {
      this.props.actions.discoveryMore(page)
    }
  }

  getTalksItem = ({item}) => {
    return <TalksItem item={item} navigation={this.props.navigation}/>
  }

  getRanksItem = ({item}) => {
    const {navigation} = this.props
    return (<FlatList
      horizontal
      removeClippedSubviews={false}
      data={item.data}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => <RecommendUserItem item={item} position={index} LovedFollowed={this.props.actions.recommendUserFollowed} navigation={navigation}/>}
    />)
  }

  getSectionView = ({section}) => {
    const {talks, ranks} = this.props
    if (section.key === 'talks' && talks.length > 0) {
      return this.getTalksSectionHeader()
    } else if (section.key === 'ranks' && ranks.length > 0) {
      return this.getTopUsersSectionHeader()
    }
  }

  getHeaderView = () => {
    const {banners} = this.props
    if (banners.length > 0) {
      return (<Swiper style={styles.wrapper}
        height={170}
        activeDot={<View style={
                              styles.activeDot}/>}
        dot={<View style={styles.dot}/>}
        showsButtons={false}
        autoplay
        autoplayTimeout={5}>
        {
          banners.map((item, i) => <TouchableOpacity key={i} style={styles.slide} onPress={this._bannerRouter.bind(this, i)}>
            <Image resizeMode="stretch" source={{uri: item.img_url}} style={styles.image}/>
          </TouchableOpacity>)}
      </Swiper>)
    }
    return <View />
  }

  getTalksSectionHeader = () => (<View style={styles.talksSection}>
    <View style={{width: 1.5, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15}} />
    <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '500', color: theme.text.globalSubTextColor}}>浅言浅语</Text>
    </View>
  </View>)

  getTopUsersSectionHeader = () => (<View style={styles.talksSection}>
    <View style={{width: 1.5, backgroundColor: '#aecc9a', marginTop: 15, marginBottom: 15}} />
    <View style={{flex: 1, marginLeft: 16, flexDirection: 'column', justifyContent: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '500', color: theme.text.globalSubTextColor}}>备受宠爱</Text>
    </View>
    <TouchableOpacity style={{flexDirection: 'column', justifyContent: 'center'}} onPress={this._routerToLovedList}>
      <Text style={{fontSize: 15, color: theme.text.globalSubTextColor}}>更多</Text>
    </TouchableOpacity>
  </View>)

  _routerToTopicList = () => {
    this.props.navigation.navigate('TopicListPage', {come4: 'discovery'})
  }

  _routerToLovedList = () => {
    this.props.navigation.navigate('LovedListPage', {message: '备受宠爱'})
  }

  _bannerRouter = (index) => {
    const {banners} = this.props
    if (banners[index].type === 0) {
      this.props.navigation.navigate('CommonWebviewPage', {url: banners[index].link, name: ''})
      // navigation.navigate('DiaryDetailPage', {me: false, item: item})
    } else if (banners[index].type === 1) {
      alert('1')
    } else if (banners[index].type === 2) {
      alert('2')
    }
    // this.props.navigation
  }
}

const mapStateToProps = (state) => {
  const {discovery} = state
  return {
    isRefreshing: discovery.isRefreshing,
    talks: discovery.talks,
    ranks: discovery.ranks,
    banners: discovery.banners,
    hasMoreData: discovery.hasMoreData,
    isLoadingMore: discovery.isLoadingMore,
    page: discovery.page
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    height: 52,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  image: {
    width: theme.screenWidth,
    height: 170
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
