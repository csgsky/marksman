import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import DiaryEmpty from '../img/diary_empty.png'
import theme from '../config/theme'

class PersonalInfoView extends Component {
  renderEmptyView = () => (
    <View style={styles.emptyView}>
      <Image style={styles.emptyImg} resizeMode="contain" source={DiaryEmpty} />
      <Text style={styles.emptyText}>这个人很懒，什么都没留下~</Text>
    </View>
  )
  render () {
    const {info} = this.props
    return (
      <View>
        <View style={styles.container}>
          <Image source={this._getSource(info.avtar)} style={styles.img}/>
          <Text style={styles.nickname}>{info.nickname}</Text>
          <View style={styles.nums}>
            <Text style={styles.num}>公开日记  {info.diary_num}  |</Text>
            <Text style={styles.num}>  粉丝  {info.focus_num}</Text>
            <Text style={styles.num}>  |  收获赞  {info.like_num}</Text>
          </View>
          <Text style={styles.sign} numberOfLines={2}>{info.sign || '慵懒~也是一种生活的姿态！'}</Text>
        </View>
        {info.diary_num === 0 && this.renderEmptyView()}
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
    borderBottomColor: theme.border.color,
    borderBottomWidth: 0.5,
    paddingBottom: 16
  },
  nums: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 6
  },
  num: {
    fontSize: 12,
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
    lineHeight: 26,
    marginTop: 4
  },
  sign: {
    fontSize: 12,
    marginLeft: 40,
    marginRight: 40,
    color: '#9b9b9b'
  },
  emptyImg: {
    width: 150,
    height: 75,
    alignSelf: 'center'
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#f89f33',
    alignSelf: 'center'
  },
  emptyView: {
    backgroundColor: 'white',
    marginTop: 134,
    marginBottom: 40,
  }
})

export default PersonalInfoView
