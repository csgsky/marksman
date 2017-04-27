'use strict'
import React, {Component} from 'react'

import {Navigator, NativeModules} from 'react-native'
import MainPage from '../page/MainPage'
import Login from '../page/login/login'
export default class Navigation extends Component {
  render () {
    return (
        <Navigator
            initialRoute={{component: Login}}
            renderScene={(route, navigator) => { return <route.component navigator={navigator} {...route.args}/> }
            }
            configureScene={(route) => Navigator.SceneConfigs.PushFromRight}/>)
  }

  componentDidMount () {
    NativeModules.SplashScreen.hide()
  }
}


