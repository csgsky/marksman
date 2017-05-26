import React, {Component} from 'React'
import {StyleSheet, View, Text, Image, AsyncStorage} from 'react-native'
import theme from '../../config/theme'
import Rx from 'rxjs'
import { NavigationActions } from 'react-navigation'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
const resetActionMain = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Tab'})
  ]
})
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'LabelPage'})
  ]
})
export default class Splash extends Component {
  componentDidMount () {
   Rx.Observable.timer(0, 1000).subscribe(it => {
      if ((it + 1) === 5) {
        AsyncStorage.getItem('first').then(
          (result) => {
            if (result !== null) {
              this.props.navigation.dispatch(resetActionMain)
            } else {
              this.props.navigation.dispatch(resetAction)
            }
          }
        )
      }
    })
  }
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Image style= {styles.lable} source={require('../../img/splash.jpg')}></Image>
        </View>
        <Text style={styles.skipText} onPress={this._onPress}>跳过</Text>
      </View>
    )
  }

  _onPress = () => {
    AsyncStorage.getItem('first').then(
          (result) => {
            if (result !== null) {
              this.props.navigation.dispatch(resetActionMain)
            } else {
              this.props.navigation.dispatch(resetAction)
            }
          }
        )
  }


  componentWillUnmount () {
    console.log('componentWillUnmount ====> ')
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenHeight
  },
  skipText: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#dcdddd',
    width: 55,
    fontSize: 13,
    color: '#ffffff',
    alignSelf: 'center',
    paddingTop: 4,
    paddingLeft: 12
  }
})
