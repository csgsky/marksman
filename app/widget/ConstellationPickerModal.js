import React, { Component } from 'react'
import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
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
            <View style={styles.title}>
              <Text style={{color: theme.text.globalTextColor, fontSize: 18}}>星座选择</Text>
            </View>
            <View style={styles.dialog}>
              <Picker style={{width: theme.screenWidth - 39, height: 39 * 4, backgroundColor: 'white'}}
                selectedValue={this.state.selectedItem}
                itemStyle={{color: theme.text.globalTextColor, fontSize: 16}}
                onValueChange={index => this.setState({selectedItem: index})}>
                {this.state.itemList.map((value, i) => (
                  <PickerItem label={value} value={i} key={value}/>
              ))}
              </Picker>
              <View style={styles.menuView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.cancelItem} onPress={this.props.hideConstellation}>
                  <Text style={{color: theme.text.globalSubTextColor, fontSize: theme.text.xxlgFontSize}}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.cancelItem} onPress={() => this.props.selectConstellation(this.state.itemList[this.state.selectedItem])}>
                  <Text style={{color: '#2d4896', fontSize: theme.text.xxlgFontSize}}>确定</Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: theme.screenWidth - 39,
    backgroundColor: 'white'
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
    borderLeftWidth: 0.3,
    borderTopWidth: 0.3,
  },
  title: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.3
  }
})
