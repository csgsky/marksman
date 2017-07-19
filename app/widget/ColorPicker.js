import React, { Component } from 'react'
import {View, Image, StyleSheet, InteractionManager } from 'react-native'
import tinycolor from 'tinycolor2'

import { createPanResponder } from '../utils/ColorPickerUtils'
import colorPickerImage from '../img/color_picker.png'

export default class ColorPicker extends Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      color: { h: 250, s: 0.34, v: 1 },
      pickerSize: null,
      pickerWidth: null,
      pickerHeight: null
    }
    if (props.defaultColor) {
      this.state.color = tinycolor(props.defaultColor).toHsv()
    }
    this._onLayout = this._onLayout.bind(this)
  }

  _onColorChange (color) {
    this.setState({ color })
    if (this.props.onColorChange) {
      this.props.onColorChange(tinycolor(color).toHexString(), this._getFeel(color.h))
    }
  }

  _getFeel (h) {
    if (Math.round(((338 - h) / 9) + 1) > 10) {
      return 10
    } else if (Math.round(((338 - h) / 9) + 1) < 0) {
      return 0
    }
    return Math.round(((338 - h) / 9) + 1)
  }

  _onLayout(l) {
    this._layout = l.nativeEvent.layout
    const { width, height } = this._layout
    this.setState({
      pickerHeight: height,
      pickerWidth: width
    })

    InteractionManager.runAfterInteractions(() => {
      this.refs.pickerContainer && this.refs.pickerContainer.measure((x, y, width, height, pageX, pageY) => {
        this._pageX = pageX
        this._pageY = pageY
      })
    })
  }

  _computeHValue(x, y) {
    if (x < 0) {
      return 338
    } else if (Math.round(338 - (x / this.state.pickerWidth) * 88) < 250) {
      return 250
    }
    return Math.round(338 - (x / this.state.pickerWidth) * 88)
  }

  _hValueToLength (h, style) {
    const left = ((338 - h) / 88) * style.width
    if (left < 0) {
      return 0
    } else if (left > (style.width - style.height)) {
      return style.width - style.height
    }
    return Math.round(left)
  }

  componentWillMount() {
    const handleColorChange = ({ x, y }) => {
      const { s, v } = this._getColor()
      const relativeX = x - this._pageX;
      const relativeY = y - this._pageY;
      const h = this._computeHValue(relativeX, relativeY)
      this._onColorChange({ h, s, v })
    }
    this._pickerResponder = createPanResponder({
      onStart: handleColorChange,
      onMove: handleColorChange,
    })
  }

  getColor() {
    return tinycolor(this._getColor()).toHexString()
  }

  _getColor() {
    const passedColor = typeof this.props.color === 'string'
      ? tinycolor(this.props.color).toHsv()
      : this.props.color
    return passedColor || this.state.color
  }

  render() {
    const { style } = this.props
    const color = this._getColor()
    const { h } = color
    const left = this._hValueToLength(h, style)
    const selectedColor = tinycolor(color).toHexString()
    const indicatorColor = tinycolor({ h, s: 0.34, v: 1 }).toHexString()
    const computed = makeComputedStyles({
      selectedColor,
      indicatorColor,
      left,
      style
    })
    return (
      <View onLayout={this._onLayout} ref="pickerContainer" style={[style, styles.pickerContainer]}>
        <View
          {...this._pickerResponder.panHandlers}
          style={[style, {alignItems: 'center', justifyContent: 'center'}]}
          collapsable={false}>
          <Image
            source={colorPickerImage}
            resizeMode="stretch"
            style={{width: style.width, height: style.height - 10}}/>
          <View style={[styles.pickerIndicator, computed.pickerIndicator]} />
        </View>
      </View>
    )
  }

}

const makeComputedStyles = ({
  indicatorColor,
  left,
  style
}) => ({
  picker: {
    padding: 0,
    width: style.width,
    height: style.height,
  },
  pickerIndicator: {
    left,
    width: style.height,
    height: style.height,
    borderRadius: 15,
    backgroundColor: indicatorColor,
  }
})


const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerImage: {
    width: 300,
    height: 20
  },
  pickerIndicator: {
    position: 'absolute',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  }
})
