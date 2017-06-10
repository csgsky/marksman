import React, {Component} from 'React'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
import Separator from '../../component/Separator'
import ProfileItem from '../../component/item/ProfileItem'
import * as consts from '../../utils/const'
export default class ProfilePage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '个人中心',
    headerStyle: {elevation: 0},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Separator />
        <View style={styles.view}>
          <View style={styles.profile}>
            <Image  style={styles.avatar} source={require('../../img/test_icon.jpeg')}/>
            <View style={styles.desc}>
              <View style={styles.nicknameView}>
                <Text style={styles.nickname}>好好先生</Text>
              </View>
              <View style={styles.signatureView}>
                <Text style={styles.signature}>这个人很神奇，什么都没留下...</Text>
              </View>
            </View>
          </View>
          <ProfileItem value={consts.PROFILE_MINE_MESSAGE}/>
          <ProfileItem value={consts.PROFILE_MINE_FOLLOW}/>
          <ProfileItem value={consts.PROFILE_MINE_TRASH}/>
          <View style={{height: 20}}/>
          <ProfileItem value={consts.PROFILE_RECOMMOND_F}/>
          <ProfileItem value={consts.PROFILE_NOTIFICATION}/>
          <ProfileItem value={consts.PROFILE_FEEDBACK}/>
          <ProfileItem value={consts.PROFILE_ABOUT_US}/>
      </View>
      </View>
      
    )
  }
  
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white'
  },
  profile: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 24
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  desc: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2, 
    flexDirection: 'column'
  },
  nicknameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  signatureView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nickname: {
    color: theme.text.globalTextColor,
    fontSize: 18,
  },
  signature: {
    color: theme.text.globalSubTextColor,
    fontSize: 15,
  }
})