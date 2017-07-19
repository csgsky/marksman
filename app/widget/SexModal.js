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

export default class SexModal extends Component {
  render () {
    return (
      <Modal
        visible={this.props.isVisible}
        animationType={'fade'}
        transparent>
        <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={this.props.hideSex}>
          <TouchableOpacity style={styles.dialog}>
            <TouchableOpacity style={styles.recover} onPress={this.props.selectBoy}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>男</Text>
            </TouchableOpacity>
            <View style={{height: 0.5, backgroundColor: '#f8f8f8'}} />
            <TouchableOpacity style={styles.delete} onPress={this.props.selectGirl}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>女</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelItem} onPress={this.props.hideSex}>
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
    color: 'red',
    backgroundColor: 'white'
  }
})
