import React, { Component } from 'react'
import {Modal, TouchableOpacity, Text, View, StyleSheet, Platform, StatusBar} from 'react-native'
import theme from '../config/theme'

export default class Reporter extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'fade'}
        transparent>
        <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={this.props.hideReport}>
          <View style={styles.dialog}>
            <TouchableOpacity activeOpacity={0.9} style={styles.reporter} onPress={this.props.report}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>举报{this.props.come4}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.cancelItem} onPress={this.props.hideReport}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>取消</Text>
            </TouchableOpacity>
          </View>
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
  reporter: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  dialog: {
    width: theme.screenWidth,
    marginBottom: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight
  },
  cancelItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white'
  }
})

