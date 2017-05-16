'use strict'
import React, {Component} from 'react'

import {NativeModules, StatusBar} from 'react-native'
// import MainPage from '../page/MainPage'
import HomeFragment from '../page/HomeFragment'
import RaceFragment from '../page/RaceFragment'
import SocietyFragment from '../page/SocietyFragment'
import MeFragment from '../page/MeFragment'
import Login from '../page/login/login'
import theme from '../config/theme'
import TabBarItem from '../widget/TabBarItem'
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation'

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
    NativeModules.SplashScreen.hide()
  }
}

const Tab = TabNavigator(
  {
    Home: {
      screen: HomeFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '心情',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../img/main_tab_home.png')}
                selectedImage={require('../img/main_tab_home_click.png')}
            />
        )
      })
    },
    Nearby: {
      screen: RaceFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '比较',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
              tintColor={tintColor}
              focused={focused}
              normalImage={require('../img/main_tab_match.png')}
              selectedImage={require('../img/main_tab_match_click.png')}
            />
        )
      })
    },

    Order: {
      screen: SocietyFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '不错',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../img/main_tab_feed.png')}
            selectedImage={require('../img/main_tab_feed_selected.png')}
          />
        )
      })
    },
    Mine: {
      screen: MeFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../img/main_tab_me.png')}
            selectedImage={require('../img/main_tab_me_click.png')}
          />
        )
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: theme.themeColor,
      inactiveTintColor: '#979797',
      style: { backgroundColor: '#ffffff' }
    }
  }
)

const Navigator = StackNavigator(
  {
    Login: { screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Tab: {screen: Tab}
    // MainPage: {screen: MainPage}
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true
    }
  }
)

export default Navigation


