/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import Navigation from './app/config/entry'

import rootEpic from './app/epics/index'
import rootReducer from './app/reducers/index'

const epicMiddleware = createEpicMiddleware(rootEpic)
const store = createStore(
  rootReducer,
  composeWithDevTools(
      applyMiddleware(epicMiddleware)
  )
)
export default class marksman extends Component {
  render () {
    return (
      <Provider store ={store}>
        <Navigation />
      </Provider>
    )
  }
}
AppRegistry.registerComponent('marksman', () => marksman)
