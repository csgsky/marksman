import React, {Component} from 'React'
import {StyleSheet, View, Text, Image, AsyncStorage, NativeModules} from 'react-native'
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

  constructor (props) {
    super (props)
    this.state = {
      time: 3,
      timeSubscribe: ''
    }
  }
  componentDidMount () {
   const subscribe = Rx.Observable.timer(0, 1000).subscribe(it => {
      this.setState({
        time: 3 - it
      })
      if ((it + 1) === 4) {
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
   this.setState({
     timeSubscribe: subscribe
   })
   Rx.Observable.fromPromise(NativeModules.SplashScreen.getIMSI())
     .subscribe(imsi => {
       console.warn('imsi ====> ' + imsi)
     })
  }
  render () {
    return (
      <View>
        <View style={styles.lable}>
          <Image style= {styles.lable} source={require('../../img/splash.jpg')}></Image>
        </View>
        <Text style={styles.skipText} onPress={this._onPress}>跳过 {this.state.time}</Text>
      </View>
    )
  }

 _onPress = () => {
    this.state.timeSubscribe.unsubscribe()
    AsyncStorage.getItem('first').then(
          (result) => {
            console.warn('first ===> '+ result)
            if (result !== null) {
              this.props.navigation.dispatch(resetActionMain)
            } else {
              this.props.navigation.dispatch(resetAction)
            }
          }
        )
  }

 componentWillUnmount() {
   this.state.timeSubscribe.unsubscribe()
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
    fontSize: 13,
    color: '#ffffff',
    alignSelf: 'center',
    paddingTop: 4,
    paddingLeft: 12,
    paddingRight: 10
  }
})
