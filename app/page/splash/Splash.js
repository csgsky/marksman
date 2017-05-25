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
export default class Splash extends Component {
  componentDidMount () {
    Rx.Observable.timer(0, 1000).subscribe(it => {
      if ((it + 1) === 3) {
        AsyncStorage.getItem('first').then(
          (result) => {
            if (result !== null) {
              this.props.navigation.dispatch(resetActionMain)
            } else {
              this.props.navigation.navigate('LabelPageTwo', {message: 'nextPage'})
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
      </View>
    )
  }

  componentWillUnmount () {
    
  }
}
const styles = StyleSheet.create({
  lable: {
    width: theme.screenWidth,
    height: theme.screenHeight
  }
})
