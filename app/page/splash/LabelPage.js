import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
// import * as actions from '../../actions/loginActions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import chooseTagBg from '../../img/choose_tag_bg.png'
import selected from '../../img/splash_selected.png'
import boy from '../../img/boy.png'
import boyPre from '../../img/boy-pre.png'
import girl from '../../img/girl.png'
import girlPre from '../../img/girl-pre.png'
// const tagsValues = ['宠物花草', '健康养生', '摄影旅行', '食物烹饪', '公益环保', '科学自然', '摄影旅行', '食物烹饪', '公益环保']
// const tagsState = [1, 0, 0, 0, 0, 0, 0, 0, 0]
export default class LabelPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      defaultBgColor: 'white',
      defaultTextColor: '#86b368',
      selectedBgColor: '#86b368',
      selectedTextColor: 'white',
      tagsValues: ['宠物花草', '健康养生', '摄影旅行', '食物烹饪', '公益环保', '科学自然', '写写代码', '王者荣耀', '读书写字', '任性，就不告诉你~'],
      tagsState: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sex: [1, 0]
    }
  }

  _onPressTag (position) {
    const newTagsState = this.state.tagsState.slice(0)
    if (newTagsState[position] === 0) {
      newTagsState[position] = 1
    } else if (newTagsState[position] === 1) {
      newTagsState[position] = 0
    }
    this.setState({
      tagsState: newTagsState
    })
  }
  _getTagView = (position, values, selectedState) => {
    if (position !== 9) {
      return (<TouchableOpacity onPress={this._onPressTag.bind(this, position)}
        style={{borderColor: '#86b368', borderRadius: 3, borderWidth: 1, justifyContent: 'center', width: (theme.screenWidth - 104) / 3, height: 35, marginRight: 20, backgroundColor: selectedState === 1 ? '#86b368' : 'white'}}>
        <Text style={{textAlign: 'center', color: selectedState === 1 ? 'white' : '#86b368'}}>{values}</Text>
      </TouchableOpacity>)
    } else {
      return (<TouchableOpacity onPress={this._onPressTag.bind(this, position)}
        style={{borderColor: '#86b368', borderRadius: 3, borderWidth: 1, paddingLeft: 20, paddingRight: 20,justifyContent: 'center', height: 35, marginRight: 20, backgroundColor: selectedState === 1 ? '#86b368' : 'white'}}>
        <Text style={{textAlign: 'center', color: selectedState === 1 ? 'white' : '#86b368'}}>{values}</Text>
      </TouchableOpacity>)
    }
  }
  _onPressSex (position) {
    // alert(position)
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
    let tags = ''
    this.state.tagsState.forEach((value, index) => {
      if (value === 1) {
        tags += index + ','
      }
    })
    const sex = this.state.sex[0] === 1 ? 1 : 2
    this.props.navigation.navigate('LabelPageTwo', {tags: tags.slice(0, tags.length - 1), sex})
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <Image style={{flex: 1, width: theme.screenWidth, height: theme.screenHeight}}
          resizeMode="cover"
          source={chooseTagBg} />
        <View style={styles.tagView}>
          <Text style={{fontSize: 16, color: '#757575'}}>留下你身边的元素</Text>
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
          <Text style={{fontSize: 16, color: '#757575', marginTop: 15}}>选择你的性别：</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
            <TouchableOpacity activeOpacity={1} onPress={this._onPressSex.bind(this, 0)} style={{width: 24, height: 46, marginRight: 25}}>
              <Image source={this.state.sex[0] === 1 ? boyPre : boy}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={this._onPressSex.bind(this, 1)} style={{width: 24, height: 46, marginLeft: 25}}>
              <Image source={this.state.sex[1] === 1 ? girlPre : girl}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={this._onPressNext} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 160, height: 36}}
              source={selected}
              resizeMode="stretch"/>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    top: 160,
    left: 16,
    right: 16,
    bottom: 0
  }
})
