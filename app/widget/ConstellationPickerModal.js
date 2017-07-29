import React, { Component } from 'react'
import {
    Modal,
    Text,
    View,
    Platform,
    TouchableOpacity,
    StyleSheet,
    StatusBar
} from 'react-native'
import Picker from 'react-native-wheel-picker'
import theme from '../config/theme'

var PickerItem = Picker.Item

export default class ConstellationPickerModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedItem: 5,
      itemList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    }
  }

  render () {
    return (
      <Modal
        visible={this.props.isVisible}
        transparent>
        <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={this.props.hideConstellation}>
          <TouchableOpacity activeOpacity={1}>
            <View style={{flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#f8f8f8'}}>
              <TouchableOpacity style={{width: 70, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.hideConstellation}>
                <Text style={{color: '#19419e', fontSize: 18}}>取消</Text>
              </TouchableOpacity>
              <View style={styles.title}>
                <Text style={{color: theme.text.globalTextColor, fontSize: 18}}>星座选择</Text>
              </View>
              <TouchableOpacity style={{width: 70, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.props.selectConstellation(this.state.itemList[this.state.selectedItem])}>
                <Text style={{color: '#19419e', fontSize: 18}}>确定</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dialog}>
              <Picker style={{width: theme.screenWidth, height: 39 * 5, backgroundColor: 'white'}}
                selectedValue={this.state.selectedItem}
                itemStyle={{color: theme.text.globalTextColor, fontSize: 18}}
                onValueChange={index => this.setState({selectedItem: index})}>
                {this.state.itemList.map((value, i) => (
                  <PickerItem label={value} value={i} key={value}/>
              ))}
              </Picker>
              {/* <View style={styles.menuView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.cancelItem} onPress={this.props.hideConstellation}>
                  <Text style={{color: theme.text.globalSubTextColor, fontSize: theme.text.xxlgFontSize}}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.cancelItem} onPress={() => this.props.selectConstellation(this.state.itemList[this.state.selectedItem])}>
                  <Text style={{color: '#2d4896', fontSize: theme.text.xxlgFontSize}}>确定</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    flexDirection: 'column',
    backgroundColor: 'rgba(52,52,52,0.7)',
    justifyContent: 'flex-end'
  },
  dialog: {
    width: theme.screenWidth,
    backgroundColor: 'white',
    marginBottom: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight
  },
  menuView: {
    flexDirection: 'row'
  },
  cancelItem: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderLeftColor: '#dcdcdc',
    borderTopColor: '#dcdcdc',
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
  },
  titleView: {

  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5
  }
})
