import React, {Component} from 'React'
import {View, Text, TouchableOpacity, Image, RefreshControl, StyleSheet, FlatList} from 'react-native'
import * as actions from '../actions/diaryDetailAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import theme from '../config/theme'
import DiaryItem from '../component/item/DiaryItem'
class DiaryDetailPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '',
    headerStyle: {elevation: 0},
    headerRight: navigation.state.params.me ? 
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'red'}}/> 
                 </View> 
                  : <View style={{flexDirection: 'row', marginRight: 16}}>
                      <Text style={{alignSelf: 'center', fontSize: 14, marginRight: 11}}>我是真的想你</Text>
                      <Image style={{width: 40, height: 40}} resizeMode ='contain' source={require('../img/default_vatar.png')}/>
                    </View>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}>
                  <Image resizeMode ='contain'
                         style={{width: 18, height: 18, marginLeft: 16}}
                         source={require('../img/page_back.png')} />
                </TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    let diaryId = this.props.navigation.state.params.diaryId;
    this.props.actions.diaryDetailInit()
  }

  render () {
    const {isRefreshing} = this.props
    let data = [{key: '...............'},{key: '!!!!!!!!!!!!!!'},{key: '##############'},{key: '$$$$$$$$$$$$$$$$$'},
                {key: '...............q'},{key: '!!!!!!!!!!!!!!w'},{key: '##############w'},{key: '$$$$$d$$$$$$$$$$$$'},
                {key: '............h...'},{key: '!!!!!!!!g!!!!!'},{key: '#####f#########'},{key: '$$$$$$$$ss$$$$$$$$$'}]
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <FlatList
            data={data}
            renderItem={({item,index}) => <Text style={{height: 40}}>{item.key}</Text>}
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
  getHeaderView = () => {
    return <View style={{flexDirection: 'column'}}>
             <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
               <Image style={styles.stamp} resizeMode ='contain' source={this.getDiaryTpye()}/>
             </View>
             <DiaryItem 
               item = {this.props.navigation.state.params.item}
               hasComment= {false}
               showRightTime = {false}/>
            </View>
  }



  onRefresh = () => {
    console.warn('hahah ==> hehehe ===> hahah ')
  }

  handleLoadingMore = () => {
    console.warn('加载更多。。。。。。 ')
  }

  getDiaryTpye = () => {
    if(this.props.navigation.state.params.item.ifprivate ===1) {
      return require('../img/public_stamp.png')
    } else if (this.props.navigation.state.params.item.ifprivate ===0) {
      return require('../img/private_stamp.png')
    }
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
 
