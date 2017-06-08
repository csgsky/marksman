'use strict'
import React, {Component} from 'react'

import {NativeModules, StatusBar} from 'react-native'
import HomeFragment from '../page/HomeFragment'
// import FootersFragment from '../page/FootersFragment'
import DiscoveryFrament from '../page/DiscoveryFrament'
import CollectionsFragment from '../page/CollectionsFragment'
import Login from '../page/login/login'
import TabBarItem from '../widget/TabBarItem'
import LabelPage from '../page/splash/LabelPage'
import LabelPageTwo from '../page/splash/LabelPageTwo'
import Splash from '../page/splash/Splash'
import ProfilePage from '../page/profile/Profile'
import SearchPage from '../page/SearchPage'
import SettingPage from '../page/SettingPage'
import WriteDiaryPage from '../page/WriteDiaryPage'
import HotDiary from '../page/HotDiary'
import RecentDiary from '../page/RecentDiary'
import {StackNavigator, TabBarBottom, TabNavigator, TabBarTop} from 'react-navigation'
class Navigation extends Component {
  constructor () {
    super()
    StatusBar.setBarStyle('light-content')
  }
  render () {
    return (
      <Navigator />
    )
  }

  componentWillMount () {
    // NativeModules.SplashScreen.hide()
  }
}

const FooterTab = TabNavigator(
  {
    Recent: {
      screen: RecentDiary,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '最新'
      })
    },
    Hot: {
      screen: HotDiary,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '热门'
      })
    }
  },
  {
    tabBarComponent: TabBarTop,
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#9b9b9b',
      style: {backgroundColor: '#ffffff', paddingLeft: 140},
      indicatorStyle: {backgroundColor: '#f89f33', marginLeft: 140},
      labelStyle: {fontSize: 15},
      tabStyle: {width: 65}
    }
  }
)


const Tab = TabNavigator(
  {
    Home: {
      screen: HomeFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '浅记',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
                focused={focused}
                normalImage={require('../img/qianyan@2x.png')}
                selectedImage={require('../img/qianyan-selected@2x.png')}
            />
        )
      })
    },
    Footer: {
      screen: FooterTab,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '足迹',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
              focused={focused}
              normalImage={require('../img/zy@2x.png')}
              selectedImage={require('../img/zy-selected@2x.png')}
            />
        )
      })
    },
    Discovery: {
      screen: DiscoveryFrament,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '发现',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            normalImage={require('../img/find2x.png')}
            selectedImage={require('../img/find-selected@2x.png')}
          />
        )
      })
    },
    Collection: {
      screen: CollectionsFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '文集',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            normalImage={require('../img/wj@2x.png')}
            selectedImage={require('../img/wenji-selected@2x.png')}
          />
        )
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#ffa3c4',
      inactiveTintColor: '#9b9b9b',
      style: { backgroundColor: '#ffffff' }
    }
  }
)



const Navigator = StackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null
      }
    },
    LabelPage: {
      screen: LabelPage,
      navigationOptions: {
        header: null
      }
    },
    Login: { screen: Login,
      navigationOptions: {
        header: null
      }
    },
    LabelPageTwo: {
      screen: LabelPageTwo,
      navigationOptions: {
        header: null
      }
    },
    Tab: {screen: Tab,
      navigationOptions: {
        header: null
      }
    },
    SearchPage: {
      screen: SearchPage,
      mode: 'card',
      navigationOptions: {
        title: '搜索'
      }
    },
    ProfilePage: {
      screen: ProfilePage,
      mode: 'card',
      navigationOptions: {
        title: '个人主页'
      }
    },
    SettingPage: {
      screen: SettingPage,
      mode: 'card',
      navigationOptions: {
        title: '设置'
      }
    },
    WriteDiaryPage: {
      screen: WriteDiaryPage,
      mode: 'card',
      navigationOptions: {
        title: '写日记'
      }
    }
  },
  { initialRouteName: 'Splash',
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true
    }
  }
)

export default Navigation


