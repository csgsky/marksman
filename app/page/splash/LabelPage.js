import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import Toast from 'react-native-root-toast'
import chooseTagBg from '../../img/choose_tag_bg.png'
import selected from '../../img/splash_selected.png'
import boy from '../../img/boy.png'
import boyPre from '../../img/boy-pre.png'
import girl from '../../img/girl.png'
import girlPre from '../../img/girl-pre.png'
import theme from '../../config/theme'

export default class LabelPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      defaultBgColor: 'white',
      defaultTextColor: '#86b368',
      selectedBgColor: '#86b368',
      selectedTextColor: 'white',
      tagsValues: ['家有宠物', '宅腐双修', '游戏一族', '单身汪', '时尚达人', '二次元', '小说迷', '星座控', '技术男女', '我任性，不告诉你~'],
      tagsState: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sex: [null, null]
    }
  }
// 家有宠物、宅腐双修、游戏一族、单身汪、时尚达人、二次元、小说迷、技术男女、星座控、我懒，我任性，不告诉你

  _onPressTag (position) {
    const newTagsState = this.state.tagsState.slice(0)
    if (position === 9) {
      const values = newTagsState.map((value, index) => index !== 9 ? 0 : 1)
      this.setState({
        tagsState: values
      })
    } else {
      if (newTagsState[position] === 0) {
        newTagsState[position] = 1
      } else if (newTagsState[position] === 1) {
        newTagsState[position] = 0
      }
      newTagsState[9] = 0
      this.setState({
        tagsState: newTagsState
      })
    }
  }
  _getTagView = (position, values, selectedState) => {
    if (position !== 9) {
      return (<TouchableOpacity onPress={() => this._onPressTag(position)}
        style={{borderColor: '#86b368', borderRadius: 3, borderWidth: 1, justifyContent: 'center', width: (theme.screenWidth - 125) / 3, marginLeft: position % 3 === 0 ? 0 : 10, marginRight: (position === 2 || position === 5 || position === 8) ? 15 : 10, height: 35, backgroundColor: selectedState === 1 ? '#86b368' : 'white'}}>
        <Text style={{textAlign: 'center', color: selectedState === 1 ? 'white' : '#86b368'}}>{values}</Text>
      </TouchableOpacity>)
    } else {
      return (<TouchableOpacity onPress={() => this._onPressTag(position)}
        style={{borderColor: '#86b368', borderRadius: 3, borderWidth: 1, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', height: 35, backgroundColor: selectedState === 1 ? '#86b368' : 'white'}}>
        <Text style={{textAlign: 'center', color: selectedState === 1 ? 'white' : '#86b368'}}>{values}</Text>
      </TouchableOpacity>)
    }
  }
  _onPressSex (position) {
    const newSex = this.state.sex.slice(0)
    if (position === 0) {
      newSex[0] = 1
      newSex[1] = 0
    } else if (position === 1) {
      newSex[0] = 0
      newSex[1] = 1
    }
    this.setState({
      sex: newSex
    })
  }

  _onPressNext = () => {
    const tags = []
    let chooseTag = false
    this.state.tagsState.forEach((value, index) => {
      if (value === 1) {
        tags.push(index)
        chooseTag = true
      }
    })
    if (this.state.sex[0] === null && !chooseTag) {
      Toast.show('请选择性别', {
        duration: Toast.durations.shor,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true
      })
    } else if (this.state.sex[0] === null) {
      Toast.show('请选择性别', {
        duration: Toast.durations.shor,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true
      })
    } else if (!chooseTag) {
      Toast.show('请至少选择一个身边的元素', {
        duration: Toast.durations.shor,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true
      })
    } else {
      // alert(tags.toString())
      const sex = this.state.sex[0] === 1 ? 1 : 2
      this.props.navigation.navigate('LabelPageTwo', {tags: tags.toString(), sex})
    }
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <Image style={{flex: 1, width: theme.screenWidth, height: theme.screenHeight}}
          resizeMode="cover"
          source={chooseTagBg} />
        <View style={styles.tagView}>
          <Text style={{fontSize: 16, color: '#757575', backgroundColor: 'transparent'}}>留下你身边的元素</Text>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            {this._getTagView(0, this.state.tagsValues[0], this.state.tagsState[0])}
            {this._getTagView(1, this.state.tagsValues[1], this.state.tagsState[1])}
            {this._getTagView(2, this.state.tagsValues[2], this.state.tagsState[2])}
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            {this._getTagView(3, this.state.tagsValues[3], this.state.tagsState[3])}
            {this._getTagView(4, this.state.tagsValues[4], this.state.tagsState[4])}
            {this._getTagView(5, this.state.tagsValues[5], this.state.tagsState[5])}
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            {this._getTagView(6, this.state.tagsValues[6], this.state.tagsState[6])}
            {this._getTagView(7, this.state.tagsValues[7], this.state.tagsState[7])}
            {this._getTagView(8, this.state.tagsValues[8], this.state.tagsState[8])}
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            {this._getTagView(9, this.state.tagsValues[9], this.state.tagsState[9])}
          </View>
          <Text style={{fontSize: 16, color: '#757575', marginTop: 25, backgroundColor: 'transparent'}}>请选择你的性别：</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
            <TouchableOpacity activeOpacity={1} onPress={() => this._onPressSex(1)} style={{width: 28, height: 60, marginRight: 44}}>
              <Image source={this.state.sex[1] === 1 ? girlPre : girl} resizeMode="contain"/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this._onPressSex(0)} style={{width: 28, height: 60, marginLeft: 44}}>
              <Image source={this.state.sex[0] === 1 ? boyPre : boy} resizeMode="contain"/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={this._onPressNext}><Image style={{width: 160, height: 36}}
              source={selected}
              resizeMode="stretch"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tagView: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    padding: 10,
    paddingLeft: 25,
    backgroundColor: 'white',
    top: 160,
    left: 16,
    right: 16,
    bottom: 0
  }
})
