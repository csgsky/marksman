import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native'
import FollowImg from '../img/follow.png'

class CustomButton extends Component {
  render () {
    const {title} = this.props
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Image source={FollowImg} style={styles.img}/>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: '#9b9b9b',
    flex: 1,
    textAlign: 'center'
  },
  img: {
    width: 12,
    height: 12,
    marginLeft: 9
  },
  container: {
    borderWidth: 1,
    borderColor: '#9b9b9b',
    borderRadius: 10,
    flexDirection: 'row',
    width: 65,
    height: 20,
    marginRight: 13,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CustomButton
