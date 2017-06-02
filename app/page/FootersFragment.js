'use strict'
import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import RecentDiary from '../page/RecentDiary'
import HotDiary from '../page/HotDiary'

export default class FootersFragment extends Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollableTabView
             renderTabBar={() =>
               <DefaultTabBar
                 backgroundColor="white"
                 activeTextColor="#FF5000"
                 inactiveTextColor="#313131"
                 style={{borderBottomColor: '#dcdddd', borderBottomWidth: 0.5}}
                 underlineStyle={styles.tabUnderLine}/>}
             locked={true}
             tabBarTextStyle={styles.tabBarTextStyle}
             style={{width: 10}}
            >
          <RecentDiary tabLabel='最近'/>
          <HotDiary tabLabel='热门'/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabUnderLine: {
    backgroundColor: '#FF5000',
    borderColor: '#ffffff',
    height: 3
  },

  ios_tabUnderLine: {
    backgroundColor: '#FF5000',
    borderColor: '#f8f8f8',
    height: 1
  },
  // 修改 tab 字体大小
  tabBarTextStyle: {
    fontSize: 16
  },
  toolbar: {
    backgroundColor: '#25282b',
    height: 56,
    position: 'relative'
  }
})
