
import React, { Component } from 'react'
import { Image } from 'react-native'

// create a component
class TabBarItem extends Component {
  render () {
    let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
    return (
      <Image
        resizeMode ='contain'
        source={this.props.focused
            ? selectedImage
            : this.props.normalImage}
        style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
            />
    )
  }
}

export default TabBarItem
