'use strict'
import React from 'react'
import {View} from 'react-native'
import TabBar from '../component/TabBar'
import PageComponent from '../component/BackPageComponent'
export default class MainScene extends PageComponent {
  componentDidMount () {
    this._handleBack.bind(this)
  }
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TabBar navigator = {this.props.navigator}/>
      </View>
    )
  }
}
