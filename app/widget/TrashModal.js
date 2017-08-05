import React, { Component } from 'react'
import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar
} from 'react-native'
import theme from '../config/theme'

export default class PhotoPickerModal extends Component {
  render () {
    return (
      <Modal
        visible={this.props._dialogVisible}
        animationType={'fade'}
        transparent>
        <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={this.props.hide}>
          <TouchableOpacity style={styles.dialog}>
            <TouchableOpacity style={styles.recover} onPress={this.props.recoverDiary}>
              <Text style={{fontSize: theme.text.xxlgFontSize, color: 'red'}}>恢复</Text>
            </TouchableOpacity>
            <View style={{height: 0.5, backgroundColor: '#f8f8f8'}} />
            <TouchableOpacity style={styles.delete} onPress={this.props.deleteDiary}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>彻底删除</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelItem} onPress={this.props.hide}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>取消</Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dialog: {
    width: theme.screenWidth,
    marginBottom: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight
  },
  cancelItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white'
  },
  recover: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  delete: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
