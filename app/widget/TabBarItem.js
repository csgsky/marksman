
import React, { PureComponent } from 'react'
import { Image, NativeModules } from 'react-native'

// create a component
class TabBarItem extends PureComponent {
  // componentWillReceiveProps(nextProps) {
  //   const oldFocused = this.props.focused;
  //   const {focused, name, label} = nextProps;
  //   console.log({focused, oldFocused})
  //   if (focused && focused !== oldFocused) {
  //     console.log({name, label})
  //     NativeModules.TCAgent.track(name, label)
  //   }
  // }
  render () {
    let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
    // console.log('render', this.props.focused)
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
