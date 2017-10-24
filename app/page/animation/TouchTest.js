import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  PanResponder,
} from 'react-native'

const CIRCLE_SIZE = 80
const CIRCLE_COLOR = 'blue'
const CIRCLE_HIGHLIGHT_COLOR = 'green'

export default class TouchTest extends Component {

  constructor (props) {
    super(props)
    this._panResponder = {}
    this._previousLeft = 0
    this._previousTop = 0
    this._circleStyles = {}
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };
  }

  componentDidMount () {
    this._updatePosition()
  }

  _heightLight = () => {
    const circle = this.circle
    if (circle) {
      circle.setNativeProps({
        style: {
          backgroundColor: 'white'
        }
      })
    }
  }

  _unHeightLight = () => {
    const circle = this.circle
    if (circle) {
      circle.setNativeProps({
        style: {
          backgroundColor: CIRCLE_COLOR
        }
      })
    }
  }

  _handlePanResponderMove = (e, gestureState) => {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  }

  _handlePanResponderEnd = (e, gestureState) => {
    this._previousLeft += gestureState.dx
    this._previousTop += gestureState.dy
    this._unHeightLight()
  }

  _handlePanResponderGrant = () => {
    this._heightLight()
  }

  _updatePosition = () => {
    if (this.circle) {
      this.circle.setNativeProps(this._circleStyles);
    }
  }

  render () {
    return (<View style={styles.container}>
      <View
        ref={(circle) => {
          this.circle = circle
        }}
        style={styles.circle}
        {...this._panResponder.panHandlers}
      />
    </View>)
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0
  },
  container: {
    flex: 1,
    paddingTop: 64
  }
})
