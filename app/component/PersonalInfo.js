import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

class PersonalInfoView extends Component {
  render () {
    const {info} = this.props
    return (
      <View style={styles.container}>
        <Image source={this._getSource(info.avtar)} style={styles.img}/>
        <Text style={styles.nickname}>{info.nickname}</Text>
        <View style={styles.nums}>
          <Text style={styles.num}>公开日记 {info.diary_num} |</Text>
          <Text style={styles.num}> 粉丝 {info.focus_num}</Text>
          <Text style={styles.num}> | 收获赞 {info.like_num}</Text>
        </View>
        <Text style={styles.sign}>{info.sign}</Text>
      </View>
    )
  }

  _getSource = (img) => {
    return img === '' ? require('../img/default_vatar.png') : {uri: img}
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    paddingBottom: 16
  },
  nums: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 6
  },
  num: {
    fontSize: 10,
    color: '#4a4a4a'
  },
  borderLR: {
    borderLeftColor: '#4a4a4a',
    borderLeftWidth: 1,
    borderRightColor: '#4a4a4a',
    borderRightWidth: 1
  },
  img: {
    width: 66,
    height: 66,
    borderRadius: 33
  },
  nickname: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 22
  },
  sign: {
    fontSize: 10,
    color: '#9b9b9b'
  }
})

export default PersonalInfoView
